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
import RoleList from "@/pages/admin/Role/RoleList";
import VisitorRegister from "@/pages/auth/VisitorRegister";
import StaffVisitorRegister from "@/pages/admin/Visitor/StaffVisitorRegister";
import StaffVisitorList from "@/pages/admin/Visitor/StaffVisitorList";
import DepartmentList from "@/pages/admin/Department/DepartmentList";
import StaffVisitorDetails from "@/pages/admin/Visitor/StaffVisitorDetails";
import DesignationList from "@/pages/admin/Designation/DesignationList";
import AdminMyAccount from "@/pages/admin/myAccount/AdminMyAccount";

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
  {
    path: "/visitor/register",
    name: "Visitor Registration",
    element: VisitorRegister,
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
    path: "admin/role",
    name: "Role Listing",
    element: RoleList,
  },
  {
    path: "admin/department",
    name: "Department Listing",
    element: DepartmentList,
  },
  {
    path: "admin/designation",
    name: "Designation Listing",
    element: DesignationList,
  },
  {
    path: "admin/visitor/register",
    name: "Visitor Registration",
    element: StaffVisitorRegister,
  },
  {
    path: "admin/visitor",
    name: "Visitor Registration",
    element: StaffVisitorList,
  },
  {
    path: "admin/visitor/details/:token",
    name: "Visitor Details",
    element: StaffVisitorDetails,
  },
  {
    path: "admin/account",
    name: "My Account",
    element: AdminMyAccount,
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
