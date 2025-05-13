import emailjs from "emailjs-com";

export const sendEmail = async (formData) => {
  const templateParams = {
    to_email: formData.email,
    to_name: formData.name,
    admissionYear: formData.admissionYear,
    graduationYear: formData.graduationYear,
    favoriteMemory: formData.favoriteMemory,
  };

  try {
    await emailjs.send(
      "service_zois1o9",    
      "template_g5atf4h",  
      templateParams,
      "iHc9vZtcr9EZxxIqZ"   
    );
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
