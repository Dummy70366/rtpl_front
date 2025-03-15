import { axiosDelete, axiosGet, axiosPost, axiosPut } from "../axios/axios";

const prefix = "/employee";

export const GetAllEmployee = (query: string) => {
  return axiosGet(`${prefix}/getEmployeeList/${query}`);
};

export const GetEmployeeDataById = (id: any) => {
  return axiosGet(`${prefix}/getEmployeeById/${id}`);
};

// export const AddEmployeeData = (data: object) => {
//   return axiosPost(`${prefix}`, data);
// };
export const ActivatEmployee = (data: object) => {
  return axiosPost(`${prefix}/activateEmployee`, data);
};

export const EditEmployeeData = (data: object, id: string) => {
  return axiosPut(`${prefix}/${id}`, data);
};

export const DeleteEmployee = (id: number) => {
  return axiosDelete(`${prefix}/` + id);
};
