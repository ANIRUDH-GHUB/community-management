import { pushDataToDoc } from ".";
import { getDateTime } from "../utils/dateUtil";
import { fetchDocData } from "./";
import { getStoreData } from "./StorageService";

const containsObject = (arr: any[], obj: { [key: string]: any }) =>
  arr?.some((item) => {
    item.date = getDateTime(item?.date?.seconds);

    return hash(item) === hash(obj);
  });

const deleteObject = (arr: any[], obj: { [key: string]: any }) =>
  arr.filter((item) => {
    return hash(item) !== hash(obj);
  });

const hash = (item: any) =>
  `${item?.visId}${item?.res?.uid}${
    item?.date?.seconds
      ? getDateTime(item?.date?.seconds).toLocaleDateString()
      : item?.date?.toLocaleDateString()
  }`;

export const scheduleVisit = async (booking: {
  res: any;
  visId: string;
  visName: string;
  date: any;
  duration: number;
  approved?: boolean;
  rejected?: boolean;
}) => {
  const bookingDetails = { approved: false, rejected: false, ...booking };
  const bookingRes = await fetchDocData("bookings", booking.res.uid);
  const userRes = await fetchDocData("user", booking.visId);
  let visitors = bookingRes?.data?.visitors || [];
  if (!containsObject(visitors, bookingDetails)) visitors.push(bookingDetails);

  await pushDataToDoc("bookings", booking.res.uid, {
    visitors: visitors,
  });

  let bookings = userRes?.data?.bookings || [];
  if (!containsObject(bookings, bookingDetails)) bookings.push(bookingDetails);
  await pushDataToDoc("user", booking.visId, {
    ...userRes.data,
    bookings: bookings,
  });
};

export const updateVisit = async (
  booking: {
    res: any;
    visId: string;
    visName: string;
    date: any;
    duration: number;
    approved?: boolean;
    rejected?: boolean;
  },
  oldBooking: any
) => {
  const bookingDetails = { approved: false, rejected: false, ...booking };
  const oldBookingRes = await fetchDocData("bookings", oldBooking.res.uid);
  let oldVisitors = oldBookingRes?.data?.visitors || [];
  oldVisitors = deleteObject(oldVisitors, oldBooking);
  await pushDataToDoc("bookings", oldBooking.res.uid, {
    visitors: oldVisitors,
  });
  const newbookingRes = await fetchDocData("bookings", booking.res.uid);
  let newVisitors = newbookingRes?.data?.visitors || [];
  newVisitors.push(bookingDetails);
  await pushDataToDoc("bookings", booking.res.uid, {
    visitors: newVisitors,
  });

  const userRes = await fetchDocData("user", booking.visId);
  let bookings = userRes?.data?.bookings || [];
  bookings = deleteObject(bookings, oldBooking);
  bookings.push(bookingDetails);
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

export const approve = async (booking: any, val: boolean) => {
  const bookingRes = await fetchDocData("bookings", booking.res.uid);
  const userRes = await fetchDocData("user", booking.visId);
  let visitors = bookingRes?.data?.visitors || [];
  let res: any[] = [];
  visitors?.forEach((item: any) => {
    if (hash(item) === hash(booking)) {
      res = [...res, { ...item, approved: val, rejected: !val }];
    } else {
      res.push(item);
    }
  });
  await pushDataToDoc("bookings", booking.res.uid, {
    visitors: res,
  });

  let bookings = userRes?.data?.bookings || [];
  res = [];
  bookings?.forEach((item: any) => {
    if (hash(item) === hash(booking)) {
      res = [...res, { ...item, approved: val, rejected: !val }];
    } else {
      res.push(item);
    }
  });
  await pushDataToDoc("user", booking.visId, {
    ...userRes.data,
    bookings: res,
  });
};
