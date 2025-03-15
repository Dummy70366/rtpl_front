import { transportSummaryEnum } from "@/enum/transport";
import {
  SidebarAccounts,
  SidebarAdmin,
  SidebarCalendar,
  SidebarContracts,
  SidebarEmployees,
  SidebarHome,
  SidebarMedical,
  RoundUserIcon,
  SidebarSetup,
  SidebarTimesheets,
  TruckIcon,
} from "@/components/svgIcons";

export const companyOptions = [
  {
    label: "RTPL 1",
    value: "1",
  },
  {
    label: "RTPL 2",
    value: "2",
  },
  {
    label: "RTPL 3",
    value: "3",
  },
  {
    label: "RTPL 4",
    value: "4",
  },
];

export const companyAddressOptions = [
  {
    label: "ADDRESS 1",
    value: "ad1",
  },
  {
    label: "ADDRESS 2",
    value: "ad2",
  },
  {
    label: "ADDRESS 3",
    value: "ad3",
  },
  {
    label: "ADDRESS 4",
    value: "ad4",
  },
];

export const formatOptionData = [
  {
    label: "Request at start, once only",
    value: "Request at start, once only",
  },
  {
    label: "Request days before expiry",
    value: "Request days before expiry",
  },
  {
    label: "Available anytime",
    value: "Available anytime",
  },
  {
    label: "Tuesdays and Thursdays",
    value: "Tuesdays and Thursdays",
  },
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const folderTypeIdList = [
  {
    label: "Default",
    value: 1,
  },
  {
    label: "Approve",
    value: 2,
  },
];

export const transportSummaryTypeList = [
  {
    label: "Model",
    value: transportSummaryEnum.Model,
  },
  {
    label: "Type",
    value: transportSummaryEnum.Type,
  },
  {
    label: "Position",
    value: transportSummaryEnum.Position,
  },
  {
    label: "Capacity",
    value: transportSummaryEnum.Capacity,
  },
];

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const MenuList = [
  {
    name: "Dashboard",
    link: "/",
    icon: SidebarHome,
    subMenu: false,
  },
  {
    name: "Employee",
    link: "#",
    icon: RoundUserIcon,
    subMenu: true,
    subMenuList: [
      {
        name: "List",
        id: "employee",
        link: "admin/employee",
      },
    ],
  },
  {
    name: "Admin",
    link: "#",
    icon: SidebarAdmin,
    subMenu: true,
    subMenuList: [
      {
        name: "Add Visior",
        id: "user",
        link: "admin/visitor/register",
      },
    ],
  },
  {
    name: "Company",
    link: "#",
    icon: SidebarContracts,
    subMenu: true,
    subMenuList: [
      {
        name: "List",
        id: "company-list",
        link: "/admin/company",
      },
    ],
  },
];
