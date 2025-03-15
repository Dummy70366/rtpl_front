/** @format */
import Home from "../../pages/home/Home";
import Login from "../../pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ForgotOTPVerification from "@/pages/auth/ForgotOTPVerification";
import ResetPassword from "@/pages/auth/ResetPassword";
import Register from "@/pages/auth/Register";
import CompanyList from "@/pages/admin/Company/CompanyList";
import OfficesList from "@/pages/admin/Offices/OfficesList";
import EmployeeList from "@/pages/admin/Employee/EmployeeList";
import  VisitorRegister from "@/pages/admin/Visitor/VisitorRegister";

export const AuthRoutes = [
  {
    path: "/login",
    name: "Login",
    element: Login,
  },
  {
    path: "/register",
    name: "Register",
    element: Register,
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    element: ForgotPassword,
  },
  {
    path: "/forgot-otp-verification",
    name: "Forgot OTP verification",
    element: ForgotOTPVerification,
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    element: ResetPassword,
  },
];

export const RoutesPath = [
  {
    path: "/",
    name: "Home",
    element: Home,
  },
  {
    path: "admin/company",
    name: "Company Listing",
    element: CompanyList,
  },
  {
    path: "admin/company/office/:id",
    name: "Office Listing",
    element: OfficesList,
  },
  {
    path: "admin/employee",
    name: "Employee Listing",
    element: EmployeeList,
  },
  {
    path: "admin/visitor/register",
    name: "Visitor Registration",
    element: VisitorRegister,
  },
];

export const AdminPath = [
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    element: Home,
  }
];

export const routeMatch = {
  ADMIN: AdminPath,
};
