import * as Yup from "yup";

export const CompanyValidationSchema = () =>
  Yup.object().shape({
    Name: Yup.string().trim().required("Name is required"),
    email: Yup.string().trim()
            .required("Email is required")
            .email("Email is invalid")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Email is invalid"),
    contact: Yup.string().trim().required("Contact Number is required"),

  });
