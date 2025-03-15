import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setActiveEmployee,
  activeEmployeeSelector,
  activeEmployeeDataSelector,
  setActiveEmployeeData,
} from "@/redux/slices/employeeSlice";
import { activeClientSelector } from "@/redux/slices/clientSlice";
import { GroupOption, Option } from "@/interface/customSelect/customSelect";
import { IEmployeeData } from "@/interface/employee/employeeInterface";
import moment from "moment";
import { GetAllSegment } from "@/services/segmentService";
import { ISegmentData } from "@/interface/segment/segmentInterface";
import {
  setSegmentData,
  segmentDataSelector,
} from "@/redux/slices/segmentSlice";
import GroupSelectComponent from "../formComponents/customSelect/GroupSelect";
import { GetEmployeeDataById } from "@/services/employeeService";
  
const EmployeeDropdown = ({ isShowMedicalStatus = false }) => {
  const segmentDetails = useSelector(segmentDataSelector);
  const activeClient = useSelector(activeClientSelector);
  const activeEmployeeData = useSelector(activeEmployeeDataSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState<GroupOption[]>([]);
  const activeEmployee = useSelector(activeEmployeeSelector);
  const fetchAllDetails = async () => {
    if (Number(activeClient) > 0) {
      // const response = await GetAllSegment(
      //   `?sort=asc&clientId=${activeClient}`
      // );
      // if (response?.data?.responseData) {
      //   const result = response?.data?.responseData;
      //   dispatch(setSegmentData(result?.data));
      // }
    }
    dispatch(setActiveEmployee(0));
  };

  useEffect(() => {
    fetchAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClient]);

  useEffect(() => {
    activeEmployee && getEmployeeDetails(Number(activeEmployee));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEmployee]);

  const getEmployeeDetails = async (id: number) => {
    const response = await GetEmployeeDataById(id);
    if (response?.data?.responseData) {
      const resultData = response?.data?.responseData;
      dispatch(setActiveEmployeeData(resultData));
    }
  };

  useEffect(() => {
    if (segmentDetails) {
      const listData = segmentDetails?.map((val: ISegmentData) => {
        return {
          label: val?.name,
          options: val?.employee?.length
            ? val?.employee?.map((empData: IEmployeeData) => {
                return {
                  label:
                    empData?.employeeNumber +
                    " " +
                    empData?.firstName +
                    " " +
                    empData?.lastName,
                  value: empData?.id ? empData?.id : 0,
                };
              })
            : [],
        };
      });
      listData && setOptions(listData);
    }
  }, [segmentDetails]);

  return (
    <>
      <GroupSelectComponent
        options={options}
        parentClass="1300:w-[200px] 1400:w-[270px] 1700:w-[340px]"
        onChange={(e: Option) => {
          dispatch(setActiveEmployee(e.value));
        }}
        selectedValue={activeEmployee}
      />
      {isShowMedicalStatus &&
        activeEmployeeData &&
        activeEmployeeData?.medicalCheckDate &&
        activeEmployeeData?.medicalCheckExpiry &&
        `Medical Check ${moment(activeEmployeeData?.medicalCheckDate).format(
          "DD/MM/YYYY"
        )}, Expiry ${moment(activeEmployeeData?.medicalCheckExpiry).format(
          "DD/MM/YYYY"
        )}`}
    </>
  );
};

export default EmployeeDropdown;
