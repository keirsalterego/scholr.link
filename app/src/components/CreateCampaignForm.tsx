"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";

interface FormData {
  title: string;
  description: string;
  goal: string;
  deadline: string;
  category: string;
}

type CreatedCampaign = {
  slug: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  status: "active" | "completed";
  daysLeft: number;
  category: string;
  createdAt: string;
};

export function CreateCampaignForm({ onCreated }: { onCreated?: (c: CreatedCampaign) => void }) {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState<{ message: string; link: string } | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    category: "research",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey) {
      setShowSuccess({ message: "Please connect your wallet first!", link: "" });
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(null);

    try {
      // 1. Fetch Transaction from Backend
      const resp = await fetch("/api/create-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          goal: Number(formData.goal),
          metadataUri: "https://example.com/placeholder-meta.json",
          signer: publicKey.toBase58(),
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.details || "Backend failed to build transaction");
      }

      const { transaction, campaignPda } = await resp.json();

      // 2. Deserialize securely (Browser safe, no Buffer)
      const txData = Uint8Array.from(atob(transaction), (c) => c.charCodeAt(0));
      const tx = Transaction.from(txData);

      // 3. Send Transaction with Debug Logging
      try {
        const signature = await sendTransaction(tx, connection, { 
          skipPreflight: true, // Set TRUE if you want to bypass simulation (risky)
          maxRetries: 5
        });

        console.log("Transaction Signature:", signature);
        
        const confirmation = await connection.confirmTransaction(signature, "confirmed");

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
        }

        // --- Success Logic ---
        const slug = campaignPda as string; // use PDA as canonical slug

        const newCampaign: CreatedCampaign = {
          slug,
          title: formData.title,
          description: formData.description,
          goal: Number(formData.goal),
          raised: 0,
          donors: 0,
          status: "active",
          daysLeft: Math.max(
            Math.ceil((new Date(formData.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
            0
          ),
          category: formData.category,
          createdAt: new Date().toISOString(),
        };

        onCreated?.(newCampaign);

        setShowSuccess({
          message: "Campaign created! Share your Blink link:",
          link: `scholr.link/api/actions/${slug}`,
        });

        setFormData({
          title: "",
          description: "",
          goal: "",
          deadline: "",
          category: "research",
        });

      } catch (sendErr: any) {
        console.error("Wallet Send Error:", sendErr);
        
        // Extract simulation logs if available
        const logs = sendErr.logs || (sendErr.error && sendErr.error.logs);
        if (logs) {
          console.error("Simulation Logs:", logs);
          // Throw the last log line which usually contains the program error
          throw new Error(`Simulation Failed: ${logs[logs.length - 1]}`);
        }

        if (String(sendErr).includes("User rejected")) {
           throw new Error("Transaction cancelled by user.");
        }

        throw new Error(sendErr.message || "Transaction simulation failed.");
      }

    } catch (error: any) {
      console.error("Submission Error:", error);
      setShowSuccess({ message: `Error: ${error.message}`, link: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateBlinkUrl = () => {
    return showSuccess?.link ?? "";
  };

  const inputClasses = "w-full px-4 py-3 bg-[#0d0d12] border border-white/[0.06] rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#14f195]/50 focus:border-[#14f195]/50 transition-all text-[14px]";
  const labelClasses = "block text-[13px] sm:text-[14px] font-medium text-zinc-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {showSuccess && (
        <div className={`p-4 rounded-xl flex items-start gap-3 ${showSuccess.message.includes("Error") || showSuccess.message.includes("cancelled") ? "bg-red-500/10 border border-red-500/30" : "bg-[#14f195]/10 border border-[#14f195]/30"}`}>
          <div className="flex-1">
            <p className="text-[13px] sm:text-[14px] text-white">{showSuccess.message}</p>
            {showSuccess.link && (
              <p className="mt-1 text-[12px] sm:text-[13px] text-[#14f195] font-mono break-all">{showSuccess.link}</p>
            )}
          </div>
          <button type="button" onClick={() => setShowSuccess(null)} className="text-zinc-400 hover:text-white">×</button>
        </div>
      )}
      
      {/* Inputs */}
      <div>
        <label htmlFor="title" className={labelClasses}>Project title</label>
        <input type="text" id="title" name="title" required maxLength={50} placeholder="e.g. Rust OS" value={formData.title} onChange={handleChange} className={inputClasses} />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>Description</label>
        <textarea id="description" name="description" required rows={4} maxLength={500} placeholder="Describe project..." value={formData.description} onChange={handleChange} className={`${inputClasses} resize-none`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="goal" className={labelClasses}>Funding goal</label>
          <div className="relative">
             <input type="number" id="goal" name="goal" required min={1} max={1000} step={0.1} placeholder="10" value={formData.goal} onChange={handleChange} className={`${inputClasses} pr-14`} />
             <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 text-[13px] pointer-events-none">SOL</span>
          </div>
        </div>
        <div>
          <label htmlFor="deadline" className={labelClasses}>Deadline</label>
          <input type="date" id="deadline" name="deadline" required min={new Date().toISOString().split("T")[0]} value={formData.deadline} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="category" className={labelClasses}>Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} className={inputClasses}>
          <option value="research">Research</option>
          <option value="engineering">Engineering</option>
          <option value="arts">Arts & Design</option>
          <option value="social">Social Impact</option>
          <option value="hardware">Hardware</option>
          <option value="other">Other</option>
        </select>
      </div>

      {formData.title && (
        <div className="p-4 bg-[#14f195]/5 border border-[#14f195]/15 rounded-xl">
           <code className="text-[13px] sm:text-[14px] text-[#14f195] font-mono break-all">{generateBlinkUrl()}</code>
        </div>
      )}

      <button
        type="submit"
        disabled={!connected || isSubmitting}
        className="w-full py-3.5 px-6 text-[14px] font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#14f195] to-[#00d4aa] hover:shadow-lg disabled:opacity-50 rounded-xl transition-all"
      >
        {!connected ? "Connect wallet to continue" : isSubmitting ? "Creating..." : "Create campaign"}
      </button>
    </form>
  );
}