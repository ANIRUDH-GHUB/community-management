import { pushDataToDoc } from ".";
import { fetchDocData } from "./";
import { getStoreData } from "./StorageService";

export const getDate = (s: number) => {
  const t = new Date(0);
  t.setSeconds(s);
  return t;
};

const containsObject = (arr: any[], obj: { [key: string]: any }) =>
  arr?.some((item) => hash(item) === hash(obj));

const hash = (item: any) =>
  `${item?.visId}${item?.res?.uid}${
    item?.date?.seconds
      ? getDate(item?.date?.seconds).toLocaleDateString()
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
  console.log(booking);
  let res: any[] = [];
  visitors?.forEach((item: any) => {
    if (hash(item) === hash(booking)) {
      res = [...res, { ...item, approved: val, rejected: !val }];
    } else {
      res.push(item);
    }
  });
  console.log("formatted", res);
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
