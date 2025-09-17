"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import "./Form.css";

export default function ContactForm() {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("⏳ Odesílám...");

    emailjs
      .send(
        "TVŮJ_SERVICE_ID",      // service ID
        "TVŮJ_TEMPLATE_ID",     // template ID
        form,
        "TVŮJ_PUBLIC_KEY"       // public key
      )
      .then(
        () => {
          setStatus("✅ Email úspěšně odeslán!");
          setForm({ email: "", subject: "", message: "" });
        },
        (error) => {
          console.error(error);
          setStatus("❌ Chyba při odeslání.");
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="email"
        name="email"
        placeholder="Váš email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Služba / Otázka"
        value={form.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Zpráva"
        value={form.message}
        onChange={handleChange}
        required
      />
            <button>
        <div className="svg-wrapper-1">
            <div className="svg-wrapper">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
            >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
            </svg>
            </div>
        </div>
        <span>Send</span>
        </button>

      <p>{status}</p>
    </form>
  );
}
