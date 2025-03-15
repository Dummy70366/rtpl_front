import { axiosGet,axiosPost,axiosPut,axiosDelete } from "../axios/axios";

const prefix = "/company";

export const GetCompanyListData = (query: string = "") => {
  return axiosGet(`${prefix}/getCompanyList${query}`);
};

export const GetCompanyDataById = (id: string) => {
  return axiosGet(`${prefix}/${id}`);
};


export const AddCompanyData = (data: object) => {
  return axiosPost(`${prefix}/addCompnany`, data);
};

export const EditCompanyData = (data: object, id: string) => {
  return axiosPut(`${prefix}/${id}`, data);
};

export const DeletCompany = (id: number) => {
  return axiosDelete(`${prefix}/` + id);
};




/* OFFICE SERVICES */

export const GetAllOfficesById = (id: number, query: string = "") => {
  return axiosGet(`${prefix}/office/getOfficelistByCompany?companyID=${id}&${query}`);
};


export const AddOfficeData = (data: object) => {
  return axiosPost(`${prefix}/office/addOffice`, data);
};

export const EditOfficeData = (data: object, id: string) => {
  return axiosPut(`${prefix}/office/${id}`, data);
};

export const DeletOffice = (id: number) => {
  return axiosDelete(`${prefix}/office/` + id);
};
