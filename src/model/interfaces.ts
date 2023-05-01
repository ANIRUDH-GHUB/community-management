export interface USER {
  email: string;
  name: string;
  mobileNum?: string;
  password: string;
  dob?: Date;
  noOfResidents?: string;
  unit?: string;
  genre?: string;
  hobby?: string;
  degree?: string;
  uid?: string;
  role?: ROLES
}
export interface SERVICETYPE {
  id: number;
  service_name: string;
  requested_date: string;
  requested_by: number;
  description: string;
}

export type COLLLECTIONS = 'user' | 'services' | 'bookings' | 'activities' | 'apartments';

export type ROLES = "resident" | "visitor" | "admin";

export type TABS = "Home" | "Settings" | "Profile" | "Services" | "Report";
