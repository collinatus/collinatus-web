"use server";

export async function verifyAndReveal(token) {
  const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  // This is the data we keep hidden until the CAPTCHA is solved
  const PRIVATE_CONTACT = {
    email: "collinatus@gmail.com",
    phone: "657-203-5082"
  };

  if (!token) return { success: false };

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`,
    { method: "POST" }
  );

  const data = await response.json();

  if (data.success) {
    return { success: true, ...PRIVATE_CONTACT };
  }

  return { success: false };
}