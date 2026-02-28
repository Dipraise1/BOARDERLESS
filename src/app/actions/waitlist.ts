"use server";

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email address." };
  }

  // Hardcoded Formspree URL as requested
  const FORMSPREE_URL = "https://formspree.io/f/xojnzaak";

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      return { 
        success: true, 
        message: "Success! You've been added to the waitlist." 
      };
    } else {
      const data = await response.json();
      return { error: data.errors?.[0]?.message || "Failed to join waitlist. Please try again." };
    }
  } catch (error) {
    console.error("Waitlist error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
