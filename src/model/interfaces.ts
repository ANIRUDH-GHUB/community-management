export interface RESIDENT_USER {
  email: string;
  name: string;
  password: string;
  dob?: string;
  mobileNum?: string;
  noOfResidents?: string;
  unit?: string;
  genre?: string;
  hobby?: string;
  degree?: string;
}

export type ROLES = "resident" | "visitor" | "admin"

export type TABS =  "Home" | "Settings" | "Profile" | "Services" | "Report";