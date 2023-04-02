export const themes = {
  darkSilver:{
    primaryDark: '#1D2021',
    secondaryDark: '#282828',
    neutralDark: '#32302F',
    primaryLight: '504945',
    secondaryLight: '#7C6F64',
    neutralLight: '#f5f5f5',
    
  }
}
export const colors = {
  background: "#080a0c",
  elevatedBackground: themes.darkSilver.primaryDark,
  white: "#ffffff",
  gray: "#202832",
  green: "#02B290",
  peach: "#FF6666",
  slategray: "#6A84A0",
  bordergray: "#181E25",
  fountainblue: "#35BDD0",
  cardbg: "#CAD5E2",
  policeBlue: '#395B64'
};

export const roles = {
  VISITOR: "visitor",
  RESIDENT: "resident",
  ADMIN: "admin",
};

export const rolePath = {
  resident: "ResidentLanding",
  visitor: "VisitorLanding",
  admin: "AdminLanding",
};

export const activitiesList = [
  { label: "Theft", value: "theft" },
  { label: "Events", value: "event" },
  { label: "Weather Alert", value: "weather_alert" },
];
export const servicesList = [
  { label: "Car Wash", value: "car_wash" },
  { label: "Repair TV", value: "tv_repair" },
  { label: "A/C Repair", value: "ac_repair" },
  { label: "Plumber", value: "plumber" },
];

export const errpr_messages: { [key: string]: string } = {
  "auth/invalid-email": "Invalid Email",
  "auth/user-not-found": "Email not found",
  "auth/wrong-password": "Invalid Password",
  "auth/internal-error": "Password is empty",
};
