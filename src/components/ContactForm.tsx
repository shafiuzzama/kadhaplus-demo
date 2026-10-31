"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Please enter a valid email address.";
    if (values.phone && !/^[0-9+\-\s()]{7,15}$/.test(values.phone))
      e.phone = "Please enter a valid phone number.";
    if (values.message.trim().length < 10)
      e.message = "Please share a little more detail (10+ characters).";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      // Front-end demo only — no backend endpoint is wired up.
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-herbal-100 bg-white p-10 text-center shadow-card">
        <CheckCircle2 className="h-12 w-12 text-leaf-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-herbal-900">
          Thank you!
        </h3>
        <p className="mt-2 max-w-sm text-ink-soft">
          Your enquiry has been noted. Our team will get back to you soon. For
          urgent queries, please call us directly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setValues({
              name: "",
              email: "",
              phone: "",
              subject: "General enquiry",
              message: "",
            });
          }}
          className="btn-outline mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-herbal-100 bg-cream-50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-herbal-400 focus:bg-white";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-herbal-100 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-herbal-800">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={field}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-herbal-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-herbal-800">
            Phone <span className="text-ink-muted">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={field}
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            placeholder="+91 ..."
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-herbal-800">
            Subject
          </label>
          <select
            id="subject"
            className={field}
            value={values.subject}
            onChange={(e) => setValues({ ...values, subject: e.target.value })}
          >
            <option>General enquiry</option>
            <option>Product question</option>
            <option>Business / Bulk enquiry</option>
            <option>Feedback</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-herbal-800">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          placeholder="How can we help?"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        <Send className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
