"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css";

// Interface pro definici struktury a typů dat ve formuláři
interface IFormState {
  [key: string]: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm(): JSX.Element {
  const [form, setForm] = useState<IFormState>({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<boolean>(false);
  
  // Typování useRef pro přístup k metodám ReCAPTCHA komponenty
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Typ parametru 'value' je string (token) nebo null
  const handleCaptchaChange = (value: string | null): void => {
    if (value) {
      setIsCaptchaVerified(true);
    }
  };

  const validateEmail = (email: string): boolean => {
    if (!emailRegex.test(email)) {
      setEmailError("Prosím zadejte platnou emailovou adresu.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Typování události 'e' pro input a textarea elementy
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      validateEmail(value);
    }
  };

  // Typování události 'e' pro odeslání formuláře
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setStatus("❌ Zkontrolujte prosím emailovou adresu.");
      return;
    }

    if (!isCaptchaVerified) {
      setStatus("❌ Prosím ověřte, že nejste robot.");
      return;
    }

    setStatus("⏳ Odesílám...");

    emailjs
      .send(
        "service_52b4c7g",  // Váš Service ID
        "template_gwrc4ie", // Váš Template IDs
        form,
        "AeCNEjCDUi7-UaV7D"   // Váš Public Key
      )
      .then(
        () => {
          setStatus("✅ Email úspěšně odeslán!");
          setForm({ email: "", subject: "", message: "" });
          // Resetování reCAPTCHA po úspěšném odeslání
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
          setIsCaptchaVerified(false);
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
        onBlur={() => validateEmail(form.email)} // Validace při opuštění pole
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
        sitekey="6Lcfv88rAAAAAODSCVQmUVsqozaCjyRW8g2rkUcB" // Nahraďte vaším reCAPTCHA Site Key
        onChange={handleCaptchaChange}
      />
      <button disabled={!isCaptchaVerified || !!emailError}>
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