import Modal from "@/components/modal/Modal";
import { DeleteIcon, EditIocn,IconEye } from "@/components/svgIcons";
import Table from "@/components/table/Table";
import MeetingForm from "@/components/meetingForm/MeetingForm";
import {
  currentPageCount,
  currentPageSelector,
} from "@/redux/slices/paginationSlice";
import { GetCompanyListData,DeletCompany,EditCompanyData } from "@/services/companyService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyData } from "@/redux/slices/companySlice";
import { useNavigate } from "react-router-dom";

const VisitorRegister = () => {
  const [limit, setLimit] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false); // For Add Update Company Modal
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const [open, setOpen] = useState(false); // For Delete Modal
  const [loader, setLoader] = useState<boolean>(true);
  const [sort, setSorting] = useState<string>("");
  const [sortType, setSortingType] = useState<boolean>(true);
  const navigate = useNavigate();

  
  

 

 

  const handleOpenModal = (id: string) => {
    // setCompanyId(id);
    // setOpen(true);
  };

  

  


  return (
    <>
    <MeetingForm 
    isAddNew = {true}
    // visitorCount = {5}

    />
  </>
  );
};

export default VisitorRegister;
