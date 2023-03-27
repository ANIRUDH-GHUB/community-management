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
export interface SERVICETYPE {
  id: number;
  service_name: string;
  requested_date: string;
  requested_by: number;
  description: string;
}

export type ROLES = "resident" | "visitor" | "admin";

export type TABS = "Home" | "Settings" | "Profile" | "Services" | "Report";
