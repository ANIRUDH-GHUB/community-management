export const colors = {
  background: "#080a0c",
  white: "#ffffff",
  gray: "#202832",
  green: "#02B290",
  peach: "#FF6666",
  slategray: "#6A84A0",
  bordergray: "#181E25",
  fountainblue: "#35BDD0",
  cardbg: "#CAD5E2",
};

export const roles = {
  VISITOR: "visitor",
  RESIDENT: "resident",
  ADMIN: "ADMIN",
};

export const rolePath = {
  resident: "ResidentHome",
  visitor: "VisitorHome",
  admin: "AdminHome",
};

export const errpr_messages: { [key: string]: string } = {
  "auth/invalid-email": "Invalid Email",
  "auth/user-not-found": "Email not found",
  "auth/wrong-password": "Invalid Password",
  "auth/internal-error": "Password is empty",
};
