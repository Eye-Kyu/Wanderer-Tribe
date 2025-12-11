"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const phone = "31 6 13227086";
  const [message, setMessage] = useState("");

  // GSAP Entrance animation
  useEffect(() => {
    if (!widgetRef.current) return;

    gsap.from(widgetRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.6,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4,
    });
  }, []);

  // GSAP Panel open animation
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      gsap.to(panelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [open]);

  // Send message → opens WhatsApp
  const sendMessage = () => {
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" ref={widgetRef}>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-xl shadow-black/40 transition transform hover:scale-110 active:scale-95"
      >
        <MessageCircle size={30} />
      </button>

      {/* Slide-up Chat Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-20 right-0 w-72 bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-4 opacity-0 translate-y-4 pointer-events-none"
      >
        <h3 className="text-white font-semibold text-lg mb-2">
          Chat with Wanderer Tribe
        </h3>
        <p className="text-white/80 text-sm mb-4">
          Ask us anything — bookings, destinations, or custom trips ✨
        </p>

        <textarea
          className="w-full h-24 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none resize-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="w-full mt-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold py-2 rounded-xl shadow-lg shadow-black/30 transition"
        >
          Send on WhatsApp
        </button>
      </div>
    </div>
  );
}
