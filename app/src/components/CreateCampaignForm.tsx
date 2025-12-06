"use client";

import { useState, useRef } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";

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

const CATEGORIES = [
  { id: "research", label: "Research", description: "Academic & scientific projects" },
  { id: "engineering", label: "Engineering", description: "Technical & building projects" },
  { id: "arts", label: "Arts & Design", description: "Creative & artistic work" },
  { id: "social", label: "Social Impact", description: "Community & social projects" },
  { id: "hardware", label: "Hardware", description: "Physical product prototypes" },
  { id: "other", label: "Other", description: "Everything else" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  research: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  engineering: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
    </svg>
  ),
  arts: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  social: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  hardware: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  other: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

export function CreateCampaignForm({ onCreated }: { onCreated?: (c: CreatedCampaign) => void }) {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState<{ message: string; link: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    category: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectCategory = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const canProceedToStep2 = formData.title.length >= 3 && formData.category !== "";
  const canProceedToStep3 = formData.description.length >= 20;
  const canSubmit = canProceedToStep2 && canProceedToStep3 && formData.goal !== "" && formData.deadline !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !publicKey) {
      setShowSuccess({ message: "Please connect your wallet first!", link: "" });
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(null);

    try {
      console.log("Creating campaign with data:", {
        title: formData.title,
        goal: Number(formData.goal),
        signer: publicKey.toBase58(),
      });

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

      console.log("API Response status:", resp.status);

      if (!resp.ok) {
        const errorData = await resp.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.details || "Backend failed to build transaction");
      }

      const { transaction, campaignPda } = await resp.json();
      console.log("Received transaction and campaignPda:", { campaignPda, hasTransaction: !!transaction });

      if (!transaction || !campaignPda) {
        throw new Error("Backend returned invalid transaction data");
      }

      try {
        console.log("Deserializing transaction...");
        const txData = Uint8Array.from(atob(transaction), (c) => c.charCodeAt(0));
        const tx = Transaction.from(txData);
        tx.feePayer = publicKey;

        console.log("Sending transaction to wallet for approval...");
        const signature = await sendTransaction(tx, connection, { 
          skipPreflight: false,
          maxRetries: 2
        });

        console.log("Transaction sent, signature:", signature);
        console.log("Waiting for confirmation...");

        const confirmation = await connection.confirmTransaction(signature, "confirmed");

        if (confirmation.value.err) {
          throw new Error(`Transaction failed on-chain: ${JSON.stringify(confirmation.value.err)}`);
        }

        console.log("Transaction confirmed successfully!");

        const slug = campaignPda as string;

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

        console.log("Calling onCreated callback with:", newCampaign);
        onCreated?.(newCampaign);

        setShowSuccess({
          message: "Campaign created successfully!",
          link: `scholr.link/api/actions/${slug}`,
        });

        setFormData({
          title: "",
          description: "",
          goal: "",
          deadline: "",
          category: "",
        });
        setCurrentStep(1);

      } catch (sendErr: any) {
        console.error("Transaction error:", sendErr);
        const logs = sendErr.logs || (sendErr.error && sendErr.error.logs);
        if (logs && Array.isArray(logs)) {
          const errorLog = logs.find((log: string) => log.includes("Error") || log.includes("failed"));
          if (errorLog) {
            throw new Error(`Program Error: ${errorLog}`);
          }
        }

        if (String(sendErr).includes("User rejected")) {
           throw new Error("Transaction cancelled by user.");
        }

        if (String(sendErr).includes("Unexpected error")) {
          throw new Error("Wallet connection error. Try reconnecting your wallet.");
        }

        throw new Error(sendErr.message || "Failed to send transaction to blockchain.");
      }

    } catch (error: any) {
      console.error("Submission Error:", error);
      setShowSuccess({ message: `Error: ${error.message}`, link: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (step === 1) setCurrentStep(1);
              else if (step === 2 && canProceedToStep2) setCurrentStep(2);
              else if (step === 3 && canProceedToStep2 && canProceedToStep3) setCurrentStep(3);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              currentStep === step
                ? "bg-[#14f195] text-black"
                : currentStep > step
                ? "bg-[#14f195]/20 text-[#14f195]"
                : "bg-zinc-800 text-zinc-500"
            }`}
          >
            {currentStep > step ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              step
            )}
          </button>
          {step < 3 && (
            <div className={`w-12 h-0.5 mx-1 ${currentStep > step ? "bg-[#14f195]/30" : "bg-zinc-800"}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Success/Error Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl flex items-start gap-3 ${
              showSuccess.message.includes("Error") || showSuccess.message.includes("cancelled") 
                ? "bg-red-500/10 border border-red-500/20" 
                : "bg-[#14f195]/10 border border-[#14f195]/20"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              showSuccess.message.includes("Error") ? "bg-red-500/20" : "bg-[#14f195]/20"
            }`}>
              {showSuccess.message.includes("Error") ? (
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#14f195]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{showSuccess.message}</p>
              {showSuccess.link && (
                <p className="mt-1.5 text-xs text-[#14f195] font-mono break-all bg-[#14f195]/5 px-2 py-1 rounded">{showSuccess.link}</p>
              )}
            </div>
            <button type="button" onClick={() => setShowSuccess(null)} className="text-zinc-500 hover:text-white p-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <StepIndicator />

      {/* Step 1: Basics */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white">Let&apos;s start with the basics</h3>
              <p className="text-sm text-zinc-500 mt-1">Choose a category and give your project a name</p>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-3">Category</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => selectCategory(cat.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      formData.category === cat.id
                        ? "border-[#14f195] bg-[#14f195]/10"
                        : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                    }`}
                  >
                    <span className={`${formData.category === cat.id ? "text-[#14f195]" : "text-zinc-400"}`}>
                      {CATEGORY_ICONS[cat.id]}
                    </span>
                    <p className={`text-sm font-medium mt-2 ${formData.category === cat.id ? "text-[#14f195]" : "text-white"}`}>
                      {cat.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-400 mb-2">
                Project title
              </label>
              <div className={`relative rounded-xl transition-all ${focusedField === "title" ? "ring-2 ring-[#14f195]/50" : ""}`}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  maxLength={50}
                  placeholder="What are you building?"
                  value={formData.title}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("title")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#14f195]/50 transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
                  {formData.title.length}/50
                </span>
              </div>
              {formData.title && formData.title.length < 3 && (
                <p className="text-xs text-amber-500 mt-1.5">Title needs at least 3 characters</p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedToStep2}
              className="w-full py-3.5 px-6 text-sm font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-zinc-100"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* Step 2: Description */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white">Tell us more</h3>
              <p className="text-sm text-zinc-500 mt-1">Describe your project so donors know what they&apos;re supporting</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-zinc-400 mb-2">
                Description
              </label>
              <div className={`relative rounded-xl transition-all ${focusedField === "description" ? "ring-2 ring-[#14f195]/50" : ""}`}>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  maxLength={500}
                  placeholder="What problem are you solving? How will the funds be used?"
                  value={formData.description}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#14f195]/50 transition-colors resize-none"
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <p className={`text-xs ${formData.description.length < 20 ? "text-amber-500" : "text-zinc-600"}`}>
                  {formData.description.length < 20 ? `${20 - formData.description.length} more characters needed` : "Looking good!"}
                </p>
                <span className="text-xs text-zinc-600">{formData.description.length}/500</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-3.5 px-6 text-sm font-medium rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
                className="flex-1 py-3.5 px-6 text-sm font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-zinc-100"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Funding Details */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white">Set your funding goal</h3>
              <p className="text-sm text-zinc-500 mt-1">Define your target amount and campaign deadline</p>
            </div>

            <div className="space-y-4">
              {/* Funding Goal */}
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-zinc-300 mb-2.5">
                  Target Amount
                </label>
                <div className={`relative rounded-xl transition-all ${focusedField === "goal" ? "ring-2 ring-[#14f195]/50" : ""}`}>
                  <input
                    type="number"
                    id="goal"
                    name="goal"
                    required
                    min={0.1}
                    max={1000}
                    step={0.1}
                    placeholder="Enter amount"
                    value={formData.goal}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("goal")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-4 pr-20 py-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-lg placeholder-zinc-600 focus:outline-none focus:border-[#14f195]/50 focus:bg-zinc-900 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800/80 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#14f195] to-[#9945ff]" />
                      <span className="text-xs font-semibold text-zinc-300">SOL</span>
                    </div>
                  </div>
                </div>
                {formData.goal && Number(formData.goal) > 0 && (
                  <p className="mt-2 text-xs text-zinc-500">
                    Approximately ${(Number(formData.goal) * 180).toFixed(2)} USD
                  </p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-zinc-300 mb-2.5">
                  Campaign Deadline
                </label>
                <div className={`relative rounded-xl transition-all ${focusedField === "deadline" ? "ring-2 ring-[#14f195]/50" : ""}`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.deadline}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("deadline")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-14 pr-4 py-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#14f195]/50 focus:bg-zinc-900 transition-all [color-scheme:dark]"
                  />
                </div>
                {formData.deadline && (
                  <p className="mt-2 text-xs text-zinc-500">
                    {Math.ceil((new Date(formData.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days from now
                  </p>
                )}
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Campaign Guidelines</p>
                  <ul className="text-xs text-zinc-500 space-y-1">
                    <li>• Funds will be held in a secure escrow until the deadline</li>
                    <li>• Set realistic goals to increase chances of success</li>
                    <li>• You can withdraw funds once the campaign ends</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {formData.title && formData.goal && (
              <div className="p-5 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Campaign Preview</p>
                  <span className="px-2 py-0.5 bg-[#14f195]/10 text-[#14f195] text-[10px] font-semibold rounded-md">
                    READY
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14f195]/20 to-[#9945ff]/20 flex items-center justify-center text-[#14f195] shrink-0">
                    {CATEGORY_ICONS[formData.category] || CATEGORY_ICONS.other}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-white mb-1 truncate">{formData.title}</h4>
                    <p className="text-sm text-zinc-400 mb-2 line-clamp-2">{formData.description}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Goal: <span className="text-white font-medium">{formData.goal} SOL</span>
                      </span>
                      {formData.deadline && (
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(formData.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3.5 text-sm font-medium rounded-xl border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!connected || !canSubmit || isSubmitting}
                className="flex-1 py-3.5 px-6 text-sm font-semibold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-[#14f195] to-[#00d4aa] text-black hover:shadow-lg hover:shadow-[#14f195]/20"
              >
                {!connected ? "Connect Wallet" : isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating...
                  </span>
                ) : "Create Campaign"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}