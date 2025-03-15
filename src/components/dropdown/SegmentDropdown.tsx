import { useEffect, useState } from "react";
import SelectComponent from "../formComponents/customSelect/Select";
import { GetAllSegment } from "@/services/segmentService";
import { useDispatch, useSelector } from "react-redux";
import { activeClientSelector } from "@/redux/slices/clientSlice";
import { Option } from "@/interface/customSelect/customSelect";
import {
  segmentDataSelector,
  setSegmentData,
  setActiveSegment,
  activeSegmentSelector,
} from "@/redux/slices/segmentSlice";

const SegmentDropdown = () => {
  const segmentDetails = useSelector(segmentDataSelector);
  const activeClient = useSelector(activeClientSelector);
  const activeSegment = useSelector(activeSegmentSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeClient]);

  useEffect(() => {
    if (segmentDetails) {
      const resp: Option[] = segmentDetails.map(
        (data: { name: string; id: number }) => {
          return { label: data?.name, value: data?.id };
        }
      );
      resp && setOptions(resp);
    }
  }, [segmentDetails]);

  const fetchAllDetails = async () => {
    if (Number(activeClient) > 0) {
      const response = await GetAllSegment(
        `?sort=asc&clientId=${activeClient}&sortBy`
      );
      if (response?.data?.responseData) {
        const result = response?.data?.responseData;
        dispatch(setSegmentData(result.data));
        dispatch(setActiveSegment(result.data[0].id));
      }
    }
  };

  return (
    <>
      <SelectComponent
        options={options}
        parentClass="1300:w-[200px] 1400:w-[270px] 1700:w-[340px]"
        onChange={(option: Option | Option[]) => {
          dispatch(setActiveSegment((option as Option).value));
        }}
        selectedValue={activeSegment}
      />
    </>
  );
};

export default SegmentDropdown;
