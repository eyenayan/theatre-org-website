import emailjs from "emailjs-com";

// Replace with your actual Email.js credentials
const SERVICE_ID = "service_zois1o9";
const TEMPLATE_ID = "template_649x0qm";
const PUBLIC_KEY = "iHc9vZtcr9EZxxIqZ";

export const sendBillEmail = async (userData, totalAmount) => {
  try {
    const templateParams = {
      name: userData.name,
      email: userData.email,
      selectedSets: JSON.stringify(userData.selectedSets, null, 2),
      totalAmount: `₹${totalAmount}`,
      date: new Date().toLocaleString(),
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: error.text };
  }
};
