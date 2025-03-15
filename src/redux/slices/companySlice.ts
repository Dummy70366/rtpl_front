import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICompanyType {
  companyData: null | [];
  count: number;
  activeCompany: string | number;
}

const initialState = {
  companyData: [],
  count: 0,
  activeCompany: 0
};

export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<[]>) => {
      state.companyData = action.payload;
    },
    setCompanyCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setActiveCompany: (state, action: PayloadAction<string | number>) => {
      state.activeCompany = Number(action.payload);
    },
  },
});

export const companyDataSelector = (state: { company: ICompanyType }) =>
  state.company.companyData;

export const companyCountSelector = (state: { company: ICompanyType }) =>
  state.company.count;

export const activeCompanySelector = (state: { company: ICompanyType }) => 
  state.company.activeCompany;

const { actions, reducer } = CompanySlice;

export const { setCompanyData, setCompanyCount, setActiveCompany } = actions;
export const setcompanyData = (data: []) => {
    setCompanyData(data);
};
export const setcompanyCount = (count: number) => {
    setCompanyCount(count);
};
export const setactiveCompany = (activeCompany: string | number) => {
    setActiveCompany(activeCompany);
};

export default reducer;
