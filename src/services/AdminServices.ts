import { deleteDataFromDoc, fetchDocData, pushDataToDoc } from ".";
import { fetchCollectionData } from ".";
import { getStoreData } from "./StorageService";

export const getAllUsers = async (id: string = "") => {
  const res = await fetchCollectionData("user");
  return res?.data;
};
export const getAllApartments = async (id: string = "") => {
  const res = await fetchCollectionData("apartments");
  return res?.data;
};

export const getAllVisitorBookings = async () => {
  const res = await fetchCollectionData("bookings");
  let bookings: any[] = [];
  res?.data
    ?.map((item: any) => item.visitors)
    ?.forEach((item: any[]) => {
      bookings = bookings.concat(item);
    });
  return bookings;
};

export const getAllVisitorBookingsById = async (id: string) => {
  const res = await fetchDocData("bookings", id);
  return res?.success ? res?.data?.visitors : [];
};

export const addApartment = async (apartment: {
  unitName: string;
  floor: string;
  date: any;
}) => {
  pushDataToDoc("apartments", "", apartment);
};

export const deleteApartment = async (apartment: any) => {
  console.log("deleting apartment", apartment, apartment.uid);
  deleteDataFromDoc("apartments", apartment.uid);
};
