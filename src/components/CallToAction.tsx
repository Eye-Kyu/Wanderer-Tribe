"use client";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import type { CtaPrefill } from "@/context/CTAModalContext";

interface Props {
  /** "section" is the home page close (photo + contact facts); "dialog" is the modal body. */
  variant?: "section" | "dialog";
  prefill?: CtaPrefill | null;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  travellers: "",
  date: "",
  length: "",
  details: "",
};

export default function CallToAction({ variant = "section", prefill = null }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sending, setSending] = useState(false);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  // Planner or trip page values land in the matching fields
  useEffect(() => {
    if (!prefill) return;
    setForm((f) => ({
      ...f,
      travellers: prefill.travellers ?? f.travellers,
      length: prefill.length ?? f.length,
      details: prefill.details && !f.details ? prefill.details : f.details,
    }));
  }, [prefill]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.travellers) newErrors.travellers = "Select number of travellers";
    if (!form.date) newErrors.date = "Choose a travel date";
    if (!form.length) newErrors.length = "Select trip length";
    if (!form.details.trim()) newErrors.details = "Please provide trip details";
    setErrors(newErrors);
    // A failed submit focuses the first invalid field
    const first = Object.keys(newErrors)[0];
    if (first) document.getElementById(id(first))?.focus();
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        alert(
          "Your booking request has been sent! Check your email for confirmation."
        );
        setForm(emptyForm);
        setErrors({});
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send your booking request.");
    } finally {
      setSending(false);
    }
  };

  const set = (key: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const fieldProps = (key: keyof typeof emptyForm) => ({
    id: id(key),
    name: key,
    value: form[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? ("true" as const) : undefined,
    "aria-describedby": errors[key] ? id(`${key}-error`) : undefined,
    className: "field-input",
  });

  const Error = ({ name }: { name: string }) => (
    <p id={id(`${name}-error`)} className="field-error">
      {errors[name] ?? ""}
    </p>
  );

  const formEl = (
    <form noValidate onSubmit={handleSubmit} className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
      <div>
        <label htmlFor={id("firstName")} className="field-label">First name</label>
        <input type="text" autoComplete="given-name" {...fieldProps("firstName")} />
        <Error name="firstName" />
      </div>
      <div>
        <label htmlFor={id("lastName")} className="field-label">Last name</label>
        <input type="text" autoComplete="family-name" {...fieldProps("lastName")} />
        <Error name="lastName" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("email")} className="field-label">Email</label>
        <input type="email" inputMode="email" autoComplete="email" {...fieldProps("email")} />
        <Error name="email" />
      </div>
      <div>
        <label htmlFor={id("travellers")} className="field-label">Travellers</label>
        <div className="select-wrap">
          <select {...fieldProps("travellers")}>
          <option value="">Number of travellers</option>
          <option>1</option>
          <option>2</option>
          <option>3-5</option>
          <option>6-10</option>
          <option>10+</option>
        </select>
          <ChevronDown aria-hidden="true" size={18} />
        </div>
        <Error name="travellers" />
      </div>
      <div>
        <label htmlFor={id("length")} className="field-label">Trip length</label>
        <div className="select-wrap">
          <select {...fieldProps("length")}>
          <option value="">Trip length (weeks)</option>
          <option>1 Week</option>
          <option>2 Weeks</option>
          <option>3 Weeks</option>
          <option>4 Weeks+</option>
        </select>
          <ChevronDown aria-hidden="true" size={18} />
        </div>
        <Error name="length" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("date")} className="field-label">Travel date</label>
        <input type="date" {...fieldProps("date")} />
        <Error name="date" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("details")} className="field-label">About your trip</label>
        <textarea
          rows={4}
          placeholder="Where you would like to go, and what you would love to do there"
          {...fieldProps("details")}
          className="field-input resize-y"
        />
        <Error name="details" />
      </div>
      <div className="sm:col-span-2 pt-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={sending}>
          {sending ? "Sending…" : "Send my enquiry"}
        </button>
      </div>
    </form>
  );

  if (variant === "dialog") return formEl;

  return (
    <section id="cta" className="bg-paper-2 py-[var(--section-gap)]">
      <div className="container grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2>Plan your curated experience</h2>
          <p className="lead text-ink-2">
            Every trip we design is tailored to you. Tell us when, for how long and with whom, and we
            will plan the rest.
          </p>
          <div data-slot="enquiry" data-alt="A guest moment from one of your trips" className="photo aspect-[4/3] mt-2">
            <Image
              src="/images/contact-bg.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="grid gap-4 sm:grid-cols-2 border-t border-rule pt-6">
            <div>
              <dt className="text-sm text-quiet">Write to us</dt>
              <dd>
                <a className="link inline-flex items-center gap-2 py-2" href="mailto:contact@wanderertribe.com">
                  <Mail aria-hidden="true" size={16} /> contact@wanderertribe.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-quiet">WhatsApp</dt>
              <dd>
                <a className="link inline-flex items-center gap-2 py-2" href="https://wa.me/31613227086">
                  <MessageCircle aria-hidden="true" size={16} /> +31 6 1322 7086
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-3">{formEl}</div>
      </div>
    </section>
  );
}
