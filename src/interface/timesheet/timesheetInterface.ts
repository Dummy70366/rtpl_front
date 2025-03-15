import { IEmployeeData } from "../employee/employeeInterface";
import { ISegmentData } from "../segment/segmentInterface";
import { ISubSegmentData } from "../subSegment/subSegmentInterface";

export interface ITimesheetData {
  id?: number;
  clientId?: number | null;
  segmentId?: number | null;
  subSegmentId?: number | null;
  employeeId?: number | null;
  totalDays?: Date | null;
  status?: string;
  approvedAt?: Date | null;
  startDate?: Date;
  endDate?: Date;
  segment?: ISegmentData;
  subSegment?: ISubSegmentData;
  approvedBy?: number | null;
  createdBy?: number;
  updatedBy?: number | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date;
}

export interface TimesheetDataDropdown {
  employeeName: string | null;
  employee: IEmployeeData;
  dateRange: string;
  startDate: string;
  endDate: string;
  segmentName: string | null;
  segment: { name: string };
  subSegmentName: string | null;
  subSegment: { name: string; segment: { name: string } };
}

export interface ITimeSheetDetail {
  timesheetData: {
    segmentId: null | number;
    subSegmentId: null | number;
    employeeId: null | number;
    startDate: string;
    endDate: string;
    segment?: null | { id: number; name: string };
    subSegment?: null | { id: number; name: string };
    employee: {
      id: number;
      loginUserData: {
        firstName: string;
        lastName: string;
      };
    };
    client: {
      id: number;
      loginUserData: {
        name: string;
      };
    };
  };
  employeeData: [
    {
      id: number;
      fonction: string;
      medicalCheckDate: string;
      medicalCheckExpiry: null | string;
      reliquatCalculation: [
        {
          reliquat: number;
          presentDay: number;
          leave: number;
          overtime: number;
        }
      ];

      timeSheetSchedule: [
        {
          employeeId: number;
          status: string;
          date: string;
        }
      ];
      loginUserData: {
        firstName: string;
        lastName: string;
      };
    }
  ];
}

export interface IGroupedData {
  id: number;
  fonction: string;
  medicalCheckDate: string;
  medicalCheckExpiry: null | string;
  reliquatCalculation: [
    {
      reliquat: number;
      presentDay: number;
      leave: number;
      overtime: number;
    }
  ];

  timeSheetSchedule: [
    {
      employeeId: number;
      status: string;
      date: string;
    }
  ];
  loginUserData: {
    firstName: string;
    lastName: string;
  };
}

export interface ITimeSheetEmployeeData {
  id: number;
  fonction: string;
  medicalCheckDate: string;
  medicalCheckExpiry: null | string;
  reliquatCalculation: [
    {
      reliquat: number;
      presentDay: number;
      leave: number;
      overtime: number;
    }
  ];
  timeSheetSchedule: {
    employeeId: number;
    status: string;
    date: string;
  }[];
  loginUserData: {
    firstName: string;
    lastName: string;
  };
}
