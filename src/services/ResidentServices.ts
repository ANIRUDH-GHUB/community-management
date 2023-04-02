import {  pushDataToDoc } from ".";
import { fetchDocData } from "./";
import { getStoreData } from "./StorageService";

export const addService = async (service: {
  service_id:any
  service: any;
  resId: string;
  date: any;
  description: string;
}) => {
  const servicesRes = await fetchDocData("services", service.resId);
  console.log(servicesRes);

  let allServices = servicesRes?.data?.services || [];
  allServices.push(service);
  console.log("service added successfully");
  pushDataToDoc("services", service.resId, { services: allServices });
};

export const addActivity = async (activity: {
  activity: any;
  resId: string;
  date: any;
  description: string;
}) => {
  const activityRes = await fetchDocData("activities", activity.resId);
  let allActivities = activityRes?.data?.activities || [];
  allActivities.push(activity);
  console.log("activity added successfully");
  pushDataToDoc("activities", activity.resId, { activities: allActivities });
};

export const getAllServices = async (id: string = "") => {
  console.log("getting all services");
  if (id == "") {
    const creds = await getStoreData("user_creds");
    id = creds.token;
  }
  const res = await fetchDocData("services", id);
  return res?.data?.services || [];
};
export const getAllActivities = async (id: string = "") => {
  console.log("getting all activities");
  if (id == "") {
    const creds = await getStoreData("user_creds");
    id = creds.token;
  }
  const res = await fetchDocData("activities", id);
  return res?.data?.activities || [];
};
