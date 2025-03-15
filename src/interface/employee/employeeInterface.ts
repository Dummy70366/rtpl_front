import { IClientData } from "../client/clientInterface";
import { IContractSummaryData } from "../contractSummary/contractSummary";
import { IMedicalRequestData } from "../medicalRequest/MedicalRequestInterface";
import { IRotationData } from "../rotation/rotationInterface";
import { ISubSegmentData } from "../subSegment/subSegmentInterface";
import { ITimesheetData } from "../timesheet/timesheetInterface";
// import { ILoginUserData } from "../user/userInterface";

export interface IEmployeeData {
  id?: number;
  employeeNumber?: string;
  TempNumber?: string;
  contractNumber?: string;
  contractSignedDate?: Date | null;
  startDate?: Date | null;
  firstName: string;
  lastName: string;
  fonction?: string;
  dOB?: Date | null;
  placeOfBirth?: string;
  nSS?: string;
  gender: string;
  profilePicture?: string | null;
  terminationDate?: Date | null;
  baseSalary?: number;
  travelAllowance?: number;
  Housing?: number;
  monthlySalary?: number;
  address?: string;
  medicalCheckDate?: Date | null;
  medicalCheckExpiry?: Date | null;
  medicalInsurance?: boolean | null;
  contractEndDate?: Date | null;
  dailyCost?: number;
  mobileNumber?: string;
  nextOfKinMobile?: string;
  initialBalance?: number;
  photoVersionNumber?: number;
  email?: string;
  clientId: string | number;
  client?: IClientData;
  segmentId?: number | null;
  subSegmentId?: number | null;
  segment?: ISubSegmentData;
  subSegment?: ISubSegmentData;
  timeSheet?: ITimesheetData[];
  employeeContract?: IContractSummaryData[];
  rotation?: IRotationData;
  medicalRequest?: IMedicalRequestData;
  rotationId?: number | null;
  createdAt?: Date | string;
  createdBy?: number;
  updatedAt?: Date | string;
  updatedBy?: number;
  deletedAt?: Date | string;
  loginUserId?: number;
  slug?: string ;
  // loginUserData?: ILoginUserData;
  timesheet?: ITimesheetData[];
  //TODO remove any here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customBonus?: any | string | string[];
}

export interface IViewEmployeeData {
  id: number;
  loginUserId: number;
  slug: string;
  employeeNumber: string;
  TempNumber: null | number;
  contractNumber: null | number;
  contractSignedDate: null | string;
  startDate: string;
  fonction: string;
  nSS: string;
  terminationDate: null | string;
  baseSalary: number | null;
  travelAllowance: number | null;
  Housing: number | null;
  monthlySalary: number | null;
  address: string;
  medicalCheckDate: string | null;
  medicalCheckExpiry: null | string;
  medicalInsurance: null | boolean;
  contractEndDate: null | string;
  dailyCost: number;
  nextOfKinMobile: string;
  initialBalance: number;
  photoVersionNumber: number;
  clientId: number;
  segmentId: number;
  subSegmentId: number;
  rotationId: number;
  loginUserData: {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    placeOfBirth: string;
    email: string;
    phone: string;
    profileImage: string;
  };
  segment: {
    name: string;
    id: number;
  };
  subSegment: {
    name: string;
    id: number;
  };
  rotation: {
    name: string;
    id: number;
  };
  employeeContract: [];
}
