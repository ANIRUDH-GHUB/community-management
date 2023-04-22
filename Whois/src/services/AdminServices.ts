import { deleteDataFromDoc, fetchDocData, pushDataToDoc, updateDocData } from ".";
import { fetchCollectionData } from ".";

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

export const updateApartment = async (apartment: {
  unitName: string;
  floor: string;
  date: any;
}, oldApartment: any) => {
  console.log(apartment);
  console.log('old', oldApartment);
  await updateDocData('apartments', oldApartment.uid, apartment);
};

export const deleteApartment = async (apartment: any) => {
  console.log('deleteing', apartment);
  console.log("deleting apartment", apartment, apartment.uid);
  await deleteDataFromDoc("apartments", apartment.uid);
};
