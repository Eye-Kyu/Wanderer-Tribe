"use client";
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCtaModal } from "@/context/CTAModalContext";

/** Where, how many, how long: opens the enquiry with those answers filled in. */
export default function TripPlanner() {
  const { openCta } = useCtaModal();
  const uid = useId();
  const [where, setWhere] = useState("");
  const [travellers, setTravellers] = useState("");
  const [length, setLength] = useState("");

  return (
    <form
      className="planner"
      onSubmit={(e) => {
        e.preventDefault();
        openCta({
          travellers: travellers || undefined,
          length: length || undefined,
          details: where ? `I would like to travel to ${where}.` : undefined,
        });
      }}
    >
      <div className="planner-field">
        <label htmlFor={`${uid}-where`} className="field-label">Where</label>
        <div className="select-wrap">
          <select id={`${uid}-where`} name="where" value={where} onChange={(e) => setWhere(e.target.value)} className="field-input">
          <option value="">Not sure yet</option>
          <option>Africa</option>
          <option>Middle East</option>
          <option>Asia</option>
        </select>
          <ChevronDown aria-hidden="true" size={18} />
        </div>
      </div>
      <div className="planner-field">
        <label htmlFor={`${uid}-travellers`} className="field-label">Travellers</label>
        <div className="select-wrap">
          <select id={`${uid}-travellers`} name="travellers" value={travellers} onChange={(e) => setTravellers(e.target.value)} className="field-input">
          <option value="">Any</option>
          <option>1</option>
          <option>2</option>
          <option>3-5</option>
          <option>6-10</option>
          <option>10+</option>
        </select>
          <ChevronDown aria-hidden="true" size={18} />
        </div>
      </div>
      <div className="planner-field">
        <label htmlFor={`${uid}-length`} className="field-label">Trip length</label>
        <div className="select-wrap">
          <select id={`${uid}-length`} name="length" value={length} onChange={(e) => setLength(e.target.value)} className="field-input">
          <option value="">Any</option>
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>3 Weeks</option>
          <option>4 Weeks+</option>
        </select>
          <ChevronDown aria-hidden="true" size={18} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary planner-submit">
        Plan my trip
      </button>
    </form>
  );
}
