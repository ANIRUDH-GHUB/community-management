import { fetchCollectionData, pushDataToDoc } from ".";
import { getDateTime } from "../utils/dateUtil";
import { fetchDocData } from "./";
import { getStoreData } from "./StorageService";

const deleteObject = (arr: any[], obj: { [key: string]: any }) =>
  arr.filter((item) => {
    return hash(item) !== hash(obj);
  });

const hash = (item: any) =>
  `${item?.activity}${item?.res?.resId}${item.description}${
    item?.date?.seconds
      ? getDateTime(item?.date?.seconds).toLocaleDateString()
      : item?.date?.toLocaleDateString()
  }`;

export const addService = async (service: {
  // service_id:any
  service: any;
  resId: string;
  date: any;
  description: string;
}) => {
  const servicesRes = await fetchDocData("services", service.resId);
  let allServices = servicesRes?.data?.services || [];
  allServices.push(service);
  console.log("service added successfully");
  pushDataToDoc("services", service.resId, { services: allServices });
};

export const editService = async (
  service: {
    // service_id:any
    service: any;
    resId: string;
    date: any;
    description: string;
  },
  oldService: any
) => {
  const serviceRes = await fetchDocData("services", service.resId);
  let allServices = serviceRes?.data?.services || [];
  allServices = deleteObject(allServices, oldService);
  allServices.push(service);
  pushDataToDoc("services", service.resId, { services: allServices });
};
export const deleteService = async (service: {
  service: any;
  resId: string;
  date: any;
  description: string;
}) => {
  const serviceRes = await fetchDocData("services", service.resId);
  let allServices = serviceRes?.data?.services || [];
  console.log("before", allServices);
  allServices = deleteObject(allServices, service);
  console.log("after", allServices);
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

export const editActivity = async (
  activity: {
    activity: any;
    resId: string;
    date: any;
    description: string;
  },
  oldActivity: any
) => {
  const activityRes = await fetchDocData("activities", activity.resId);
  let allActivities = activityRes?.data?.activities || [];
  allActivities = deleteObject(allActivities, oldActivity);
  allActivities.push(activity);
  pushDataToDoc("activities", activity.resId, { activities: allActivities });
};

export const deleteActivity = async (activity: {
  activity: any;
  resId: string;
  date: any;
  description: string;
}) => {
  const activityRes = await fetchDocData("activities", activity.resId);
  let allActivities = activityRes?.data?.activities || [];
  allActivities = deleteObject(allActivities, activity);
  pushDataToDoc("activities", activity.resId, { activities: allActivities });
};

export const getAllServicesById = async (id: string = "") => {
  if (id == "") {
    const creds = await getStoreData("user_creds");
    id = creds.token;
  }
  const res = await fetchDocData("services", id);
  console.log("getting all services", res);

  return res?.success ? res?.data?.services : [];
};

export const getAllServices = async () => {
  const res = await fetchCollectionData("services");

  let services: any[] = [];
  res?.data
    ?.map((item: any) => item.services)
    ?.forEach((item: any[]) => {
      services = services.concat(item);
    });
  console.log(services);
  return services;
};

export const getAllActivitiesById = async (id: string = "") => {
  console.log("getting all activities");
  if (id == "") {
    const creds = await getStoreData("user_creds");
    id = creds.token;
  }
  const res = await fetchDocData("activities", id);
  return res?.data?.activities || [];
};

export const getAllActivities = async () => {
  const res = await fetchCollectionData("activities");

  let activities: any[] = [];
  res?.data
    ?.map((item: any) => item.activities)
    ?.forEach((item: any[]) => {
      activities = activities.concat(item);
    });
  console.log(activities);
  return activities;
};
