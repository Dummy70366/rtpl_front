export interface IContractSummaryData {
  id?: number;
  pdfPath?: string;
  clientId?: string |number| undefined;
  employeeId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  monthlySalary: number;
  email: string;
  contactNumber: string;
  contractVersionId: string | number;
  newContractNumber?: number;
  dateOfBirth?: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt?: Date | string;
  createdBy?: number;
  updatedAt?: Date | string;
  updatedBy?: number;
  deletedAt?: Date | null | string;
}
