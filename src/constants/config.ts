export const CONFIG = {
  PERSONAL: {
    NAME: import.meta.env.VITE_USER_NAME || "Default Name",
    NICKNAME: import.meta.env.VITE_NICKNAME || "Default Nickname",
    COLLEGE: import.meta.env.VITE_COLLEGE || "Default College",
    ROLE: import.meta.env.VITE_ROLE || "Designer",
    BIO: import.meta.env.VITE_BIO || "Hello, I am a creative.",
    LOCATION: import.meta.env.VITE_LOCATION || "Earth",
    PHONE: import.meta.env.VITE_CONTACT_PHONE || "+1 234 567 890",
  },
  SOCIALS: {
    FB_URL: import.meta.env.VITE_CONTACT_FB || "#",
    IG_URL: import.meta.env.VITE_CONTACT_IG || "#",
  },
  API: {
    SHEET_URL: import.meta.env.VITE_SHEET_API_URL || "",
  }
};
