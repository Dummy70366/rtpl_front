import { useEffect, useState } from "react";
import SelectComponent from "../formComponents/customSelect/Select";
import { GetAllClient } from "@/services/clientService";
import { useDispatch, useSelector } from "react-redux";
import {
  clientDataSelector,
  setClientData,
  setActiveClient,
  activeClientSelector,
} from "@/redux/slices/clientSlice";
import { Option } from "@/interface/customSelect/customSelect";

const ClientDropdown = ({ label = "", isCompulsory = false }) => {
  const clientDetails = useSelector(clientDataSelector);
  const activeClient = useSelector(activeClientSelector);
  const dispatch = useDispatch();
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (!clientDetails?.length) {
      fetchAllClients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clientDetails) {
      const resp: Option[] = clientDetails.map(
        (data: { name: string; id: number }) => {
          return { label: data?.name, value: data?.id };
        }
      );
      resp && setOptions(resp);
    }
  }, [clientDetails]);

  const fetchAllClients = async () => {
    const response = await GetAllClient("");
    if (response?.data?.responseData) {
      const result = response?.data?.responseData;
      dispatch(setClientData(result.data));
      dispatch(setActiveClient(result.data[0].id));
    }
  };

  return (
    <>
      <SelectComponent
        // name={""}
        options={options}
        parentClass="1300:w-[200px] 1400:w-[270px] 1700:w-[340px]"
        onChange={(option: Option | Option[]) => {
          dispatch(setActiveClient((option as Option).value));
        }}
        label={label}
        selectedValue={activeClient}
        isCompulsory={isCompulsory}
        placeholder={"Select Client"}
      />
    </>
  );
};

export default ClientDropdown;
