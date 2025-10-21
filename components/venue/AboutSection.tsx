import React from "react";

type Props = {
  text?: string;
};

export default function AboutSection({ text }: Props) {
  if (!text || text.trim().length < 40) return null;
  
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">About</h2>
      <div className="text-grey leading-relaxed whitespace-pre-line">{text}</div>
    </section>
  );
}
