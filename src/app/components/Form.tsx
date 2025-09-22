"use client";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";
import "./Form.css"; // Ujistěte se, že máte tento soubor se styly

// --- Regex pro validaci ---
const validateEmail = (email: string) => {
  // Základní regex pro kontrolu formátu emailu
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Jméno je povinné.";
    if (!formData.email.trim()) {
        tempErrors.email = "Email je povinný.";
    } else if (!validateEmail(formData.email)) {
        tempErrors.email = "Zadejte prosím platný email.";
    }
    if (!formData.message.trim()) tempErrors.message = "Zpráva je povinná.";

    const token = recaptchaRef.current?.getValue();
    if (!token) {
        tempErrors.recaptcha = "Prosím, potvrďte, že nejste robot.";
    }

    setErrors(tempErrors);
    // Vrací true, pokud v objektu s chybami nejsou žádné klíče (žádné chyby)
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      return;
    }
    
    setStatus("sending");

     const token = recaptchaRef.current?.getValue();
    
    const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        'g-recaptcha-response': token 
    };
    
    // Zadejte své údaje z EmailJS
    emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Vaše Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Vaše Template ID
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!     // Váš User ID (Public Key)
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          // Reset formuláře po úspěchu
          setFormData({ name: "", email: "", message: "" });
          recaptchaRef.current?.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("error");
          setErrors(prev => ({...prev, form: "Odeslání selhalo. Zkuste to prosím znovu."}))
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Předmět</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Vaše zpráva</label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className="error-text">{errors.message}</p>}
      </div>

      <div className="recaptcha-container">
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} // Nahraďte vaším "Site Key"
        />
        {errors.recaptcha && <p className="error-text">{errors.recaptcha}</p>}
      </div>


      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Odesílám..." : "Odeslat zprávu"}
      </button>

      {status === "success" && <p className="success-message">Děkujeme! Vaše zpráva byla úspěšně odeslána.</p>}
      {errors.form && <p className="error-text">{errors.form}</p>}
    </form>
  );
}