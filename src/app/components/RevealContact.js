"use client";

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyAndReveal } from "../actions";

export default function RevealContact() {
  const [status, setStatus] = useState("idle"); // idle | verifying | revealed
  const [data, setData] = useState(null);

  async function onCaptchaChange(token) {
    if (!token) return;
    setStatus("verifying");
    
    const result = await verifyAndReveal(token);
    
    if (result.success) {
      setData(result);
      setStatus("revealed");
    } else {
      alert("Verification failed.");
      setStatus("idle");
    }
  }

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm max-w-sm">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
        Contact Information
      </h3>

      {status === "idle" && (
        <button
          onClick={() => setStatus("captcha")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          View Email & Phone
        </button>
      )}

      {status === "captcha" && (
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={onCaptchaChange}
        />
      )}

      {status === "revealed" && data && (
        <div className="space-y-2 animate-in fade-in duration-500">
          <p className="text-gray-800">
            <strong>Email:</strong> <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a>
          </p>
          <p className="text-gray-800">
            <strong>Phone:</strong> {data.phone}
          </p>
        </div>
      )}
    </div>
  );
}