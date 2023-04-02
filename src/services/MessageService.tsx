import { pushDataToDoc } from ".";
import { fetchDocData } from "./";
import { getStoreData } from "./StorageService";

export const containsObject = (arr: any[], obj: { [key: string]: any }) =>
  arr?.some((item) => JSON.stringify(item) === JSON.stringify(obj));

export const scheduleVisit = async (booking: {
  id:any;
  res: any;
  visId: string;
  date: any;
  duration: number;
}) => {
  const bookingRes = await fetchDocData("bookings", booking.res.uid);
  let visitors;
  const bookingDetails = { ...booking, approved: false, rejected: false };
  console.log("bookingRes", bookingRes, bookingDetails);
  if (!bookingRes.success) {
    visitors = [bookingDetails];
  } else if (!containsObject(bookingRes?.data?.visitors, bookingDetails)) {
    visitors = [...bookingRes.data.visitors, bookingDetails];
  } else {
    visitors = bookingRes.data.visitors;
  }
  await pushDataToDoc("bookings", booking.res.uid, {
    visitors: visitors,
  });

  const userRes = await fetchDocData("user", booking.visId);
  console.log("res2", userRes);
  let bookings;
  if (!userRes?.data?.bookings) {
    bookings = [bookingDetails];
  } else if (!containsObject(userRes.data.bookings, bookingDetails)) {
    bookings = [...userRes.data.bookings, bookingDetails];
  } else {
    bookings = userRes.data.bookings;
  }
  await pushDataToDoc("user", booking.visId, {
    ...userRes.data,
    bookings: bookings,
  });
};

export const visitorBookings = async (id: string = "") => {
  if (id == "") {
    const creds = await getStoreData("user_creds");
    id = creds.token;
  }
  const res = await fetchDocData("user", id);
  return res?.data?.bookings || [];
};
