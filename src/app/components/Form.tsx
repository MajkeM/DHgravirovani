"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css";

// --- Best Practice: Move Constants Outside Component ---
// This prevents them from being redeclared on every render.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_VALIDATION_ERROR = "Prosím zadejte platnou emailovou adresu.";

// --- Configuration via Environment Variables ---
// IMPORTANT: These should be stored in a .env.local file.
const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
const NEXT_PUBLIC_EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

// Interface for the form fields remains the same
interface IFormState {
  [key: string]: string;
  email: string;
  subject: string;
  message: string;
}

// More descriptive type for submission status
type SubmitStatus = {
  type: "success" | "error";
  message: string;
};

export default function ContactForm(): JSX.Element {
  // --- State Management ---
  const [form, setForm] = useState<IFormState>({ email: "", subject: "", message: "" });
  const [emailError, setEmailError] = useState<string>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // --- Handlers and Validation ---
  const validateEmail = (email: string): boolean => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(EMAIL_VALIDATION_ERROR);
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    
    // Validate email as the user types for instant feedback
    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleCaptchaChange = (token: string | null): void => {
    setCaptchaToken(token);
    // If the captcha is verified, clear any previous error message
    if (token) {
        setSubmitStatus(null);
    }
  };
  
  const handleCaptchaExpire = (): void => {
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitStatus(null); // Clear previous status on new submission attempt

    // --- Pre-submission Validation ---
    if (!validateEmail(form.email)) {
        return; // Don't set a status, the emailError state already shows the problem
    }

    if (!captchaToken) {
      setSubmitStatus({ type: "error", message: "❌ Prosím ověřte, že nejste robot." });
      return;
    }
    
    // --- Submission Logic ---
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ type: "success", message: "✅ Email úspěšně odeslán!" });
      setForm({ email: "", subject: "", message: "" });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (error) {
      console.error("EmailJS submission error:", error);
      setSubmitStatus({ type: "error", message: "❌ Chyba při odeslání. Zkuste to prosím znovu." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isButtonDisabled = isSubmitting || !captchaToken || !!emailError;

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
      {emailError && <p className="error-message">{emailError}</p>}
      
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

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
        onExpired={handleCaptchaExpire} // Handle cases where the user waits too long
      />

      <button disabled={isButtonDisabled}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
             {/* SVG Path */}
          </div>
        </div>
        <span>{isSubmitting ? "Odesílám..." : "Send"}</span>
      </button>

      {submitStatus && (
        <p className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </p>
      )}
    </form>
  );
}