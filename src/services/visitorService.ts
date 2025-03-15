import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../axios/axios";

const prefix = "/visitor";

export const GetAllVisitor = (query: string) => {
  return axiosGet(`${prefix}/get_visitor_req_list/${query}`);
};

export const AddNewVisitorData = (data: object) => {
  return axiosPost(`${prefix}/visitor_request_meeting`, data);
};

export const EditVisitorData = (data: object, id: string) => {
  return axiosPut(`${prefix}/${id}`, data);
};

export const DeleteVisitor = (id: number) => {
  return axiosDelete(`${prefix}/` + id);
};
