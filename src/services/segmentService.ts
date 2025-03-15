import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../axios/axios";

const prefix = "/segment";

export const GetAllSegment = (query: string) => {
  return axiosGet(`${prefix}${query}`);
};

export const GetSegmentData = (query: string) => {
  return axiosGet(`${prefix}/get-segment-data/${query}`);
};

export const GetSegmentDataById = (id: string | number) => {
  return axiosGet(`${prefix}/${id}`);
};

export const AddSegmentData = (data: object) => {
  return axiosPost(`${prefix}`, data);
};

export const EditSegmentData = (data: object, id: string | number) => {
  return axiosPut(`${prefix}/${id}`, data);
};

export const DeleteSegment = (id: number | string) => {
  return axiosDelete(`${prefix}/` + id);
};

export const GetSegmentListByClients = (query: string) => {
  return axiosGet(`${prefix}/getSegmentListByClients${query}`);
};

export const GetSegmentDataBySlug = (slug: string) => {
  return axiosGet(`${prefix}/get-slug-data/${slug}`);
};
