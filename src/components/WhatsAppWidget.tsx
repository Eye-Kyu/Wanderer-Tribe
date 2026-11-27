"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const phone = "31 6 13227086";
  const [message, setMessage] = useState("");

  // Focus the message box when the panel opens; Escape closes it
  useEffect(() => {
    if (!open) return;
    textRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Send message → opens WhatsApp
  const sendMessage = () => {
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="wa">
      <div id={panelId} hidden={!open} className="wa-panel" role="region" aria-label="Chat on WhatsApp">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-title">Chat with Wanderer Tribe</h2>
          <button type="button" className="icon-btn" aria-label="Close the chat" onClick={() => setOpen(false)}>
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <p className="text-ink-2">Ask us about bookings, destinations or a custom trip.</p>
        <label htmlFor={`${panelId}-msg`} className="field-label">Your message</label>
        <textarea
          ref={textRef}
          id={`${panelId}-msg`}
          name="message"
          rows={3}
          className="field-input resize-y"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="button" onClick={sendMessage} className="btn btn-primary w-full">
          Send on WhatsApp
        </button>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close the WhatsApp chat" : "Chat with us on WhatsApp"}
        className="wa-toggle"
      >
        {open ? <X aria-hidden="true" size={24} /> : <MessageCircle aria-hidden="true" size={24} />}
      </button>
    </div>
  );
}
