"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface FormData {
  title: string;
  description: string;
  goal: string;
  deadline: string;
  category: string;
}

export function CreateCampaignForm() {
  const { publicKey, connected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      alert("Please connect your wallet first!");
      return;
    }

    setIsSubmitting(true);

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      console.log("Creating campaign:", {
        ...formData,
        slug,
        authority: publicKey.toBase58(),
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Campaign created! 🎉\n\nShare this link on Twitter:\nscholr.link/actions/${slug}`
      );

      setFormData({
        title: "",
        description: "",
        goal: "",
        deadline: "",
        category: "research",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
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

  const inputClasses = "w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all";
  const labelClasses = "block text-sm font-medium text-zinc-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="mt-2 flex justify-between text-xs text-zinc-600">
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
        <div className="mt-2 flex justify-end text-xs text-zinc-600">
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
              <span className="text-zinc-500 text-sm">$</span>
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
              <span className="text-zinc-500 text-sm">USDC</span>
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
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Your Blink URL</span>
          </div>
          <code className="text-sm text-purple-400 font-mono break-all">
            {generateBlinkUrl()}
          </code>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!connected || isSubmitting}
        className="w-full py-3.5 px-6 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/25 disabled:shadow-none"
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
