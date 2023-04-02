import { pushDataToDoc } from ".";
import { fetchCollectionData } from ".";
import { getStoreData } from "./StorageService";

export const getAllUsers = async (id: string = "") => {
  const res = await fetchCollectionData("user");
  return res?.data;
};

export const getAllVisitorBookings = async (id: string = "") => {
  const res = await fetchCollectionData("bookings");
  let bookings:any[]=[];
  res?.data?.map((item:any)=>item.visitors)?.forEach((item:any[])=>{
    bookings = bookings.concat(item)
  });
  return bookings
};