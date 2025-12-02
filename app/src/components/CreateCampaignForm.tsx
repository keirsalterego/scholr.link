"use client";

import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { SystemProgram, Transaction } from "@solana/web3.js";
import scholrIdl from "../idl/scholr_program.json" assert { type: "json" };

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

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Request server to build initialize_campaign transaction
      const resp = await fetch("/api/create-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          goal: Number(formData.goal),
          metadataUri: "https://example.com/irys-meta.json",
          signer: publicKey.toBase58(),
        }),
      });
      if (!resp.ok) throw new Error("Failed to build transaction");
      const { transaction } = await resp.json();
      const tx = Transaction.from(Buffer.from(transaction, "base64"));
      await sendTransaction(tx, connection, { skipPreflight: false });

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
      };

      onCreated?.(newCampaign);

      setShowSuccess({
        message: "Campaign created! Share your Blink link:",
        link: `scholr.link/actions/${slug}`,
      });

      setFormData({
        title: "",
        description: "",
        goal: "",
        deadline: "",
        category: "research",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      setShowSuccess({ message: "Failed to create campaign. Please try again.", link: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateBlinkUrl = () => {
    if (!formData.title) return "";
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `scholr.link/api/actions/${slug}`;
  };

  const inputClasses = "w-full px-4 py-3 bg-[#0d0d12] border border-white/[0.06] rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#14f195]/50 focus:border-[#14f195]/50 transition-all text-[14px]";
  const labelClasses = "block text-[13px] sm:text-[14px] font-medium text-zinc-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {showSuccess && (
        <div className="p-4 bg-[#14f195]/10 border border-[#14f195]/30 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 text-[#14f195] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <div className="flex-1">
            <p className="text-[13px] sm:text-[14px] text-white">{showSuccess.message}</p>
            {showSuccess.link && (
              <p className="mt-1 text-[12px] sm:text-[13px] text-[#14f195] font-mono break-all">{showSuccess.link}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowSuccess(null)}
            className="text-zinc-400 hover:text-white"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
      {/* Title */}
      <div>
        <label htmlFor="title" className={labelClasses}>
          Project title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={50}
          placeholder="e.g., Rust OS Kernel Project"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
        />
        <div className="mt-2 flex justify-between text-[11px] sm:text-[12px] text-zinc-600">
          <span>This appears in the Blink preview</span>
          <span>{formData.title.length}/50</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClasses}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          maxLength={500}
          placeholder="Describe your project and what the funds will be used for..."
          value={formData.description}
          onChange={handleChange}
          className={`${inputClasses} resize-none`}
        />
        <div className="mt-2 flex justify-end text-[11px] sm:text-[12px] text-zinc-600">
          <span>{formData.description.length}/500</span>
        </div>
      </div>

      {/* Goal and Deadline Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Funding Goal */}
        <div>
          <label htmlFor="goal" className={labelClasses}>
            Funding goal
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-zinc-500 text-[14px]">$</span>
            </div>
            <input
              type="number"
              id="goal"
              name="goal"
              required
              min={10}
              max={10000}
              placeholder="200"
              value={formData.goal}
              onChange={handleChange}
              className={`${inputClasses} pl-8`}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-zinc-500 text-[13px]">USDC</span>
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className={labelClasses}>
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            required
            min={new Date().toISOString().split("T")[0]}
            value={formData.deadline}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className={labelClasses}>
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="research">Research</option>
          <option value="engineering">Engineering</option>
          <option value="arts">Arts & Design</option>
          <option value="social">Social Impact</option>
          <option value="hardware">Hardware</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Preview URL */}
      {formData.title && (
        <div className="p-4 bg-[#14f195]/5 border border-[#14f195]/15 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-[11px] sm:text-[12px] font-medium text-[#14f195] uppercase tracking-wide">Your Blink URL</span>
          </div>
          <code className="text-[13px] sm:text-[14px] text-[#14f195] font-mono break-all">
            {generateBlinkUrl()}
          </code>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!connected || isSubmitting}
        className="w-full py-3.5 px-6 text-[14px] font-semibold text-[#0a0a0f] bg-gradient-to-r from-[#14f195] to-[#00d4aa] hover:shadow-lg hover:shadow-[#14f195]/25 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-xl transition-all"
      >
        {!connected
          ? "Connect wallet to continue"
          : isSubmitting
          ? "Creating..."
          : "Create campaign"}
      </button>
    </form>
  );
}
