export interface ITimesheetScheduleData {
  createdAt: Date;
  createdBy: number;
  date: Date;
  deletedAt: Date;
  employeeId: number;
  id: number;
  status: string;
  updatedAt: Date | null;
  updatedBy: null | number;
}
