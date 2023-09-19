import Modal from "@/components/modal/Modal";
import { DeleteIcon, EditIocn, IconEye } from "@/components/svgIcons";
import Table from "@/components/table/Table";
import {
  currentPageCount,
  currentPageSelector,
} from "@/redux/slices/paginationSlice";
import {
  GetAllDesignation,
  DeleteDesignation,
  EditDesignationData,
} from "@/services/designationService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddUpdateDesignation from "./AddUpdateDesignation";
import { setDesignationData } from "@/redux/slices/designationSlide";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "@/helpers/Utils";

const DesignationList = () => {
  const [limit, setLimit] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false); // For Add Update Designation Modal
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const [open, setOpen] = useState(false); // For Delete Modal
  const [loader, setLoader] = useState<boolean>(true);
  const [sort, setSorting] = useState<string>("");
  const [sortType, setSortingType] = useState<boolean>(true);
  const navigate = useNavigate();

  const [designationDataPage, setDesignationDataPage] = useState<{
    data: any;
    totalPage: number;
    totalCount: number;
  }>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });
  const [designationId, setDesignationId] = useState<string>("");
  const queryString = `?limit=${limit}&page=${currentPage}&sort=${
    sortType ? "asc" : "desc"
  }&sortBy=${sort}`;
  useEffect(() => {
    dispatch(currentPageCount(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllDesignation(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, sort, sortType]);

  async function fetchAllDesignation(query: string) {
    setLoader(true);
    const response = await GetAllDesignation(query);
    if (response?.data?.responseData) {
      const result = response?.data?.responseData;
      setDesignationDataPage({
        data: result.data,
        totalCount: result.count,
        totalPage: result.lastPage,
      });
      dispatch(setDesignationData(result.data));
    }
    setLoader(false);
  }

  const toggleButtonChange = (event: any, designationID: any) => {
    if (event.target.checked) {
      statusChange(designationID, true);
    } else {
      statusChange(designationID, false);
    }
  };

  const statusChange = async (designationID: any, status: any) => {
    try {
      let data = {
        isActive: status,
      };
      await EditDesignationData(data, designationID);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOpenModal = (id: string) => {
    setDesignationId(id);
    setOpen(true);
  };

  const designationDelete = async (id: string) => {
    try {
      const response = await DeleteDesignation(Number(id));
      if (response?.data?.response_type === "SUCCESS") {
        await fetchAllDesignation(queryString);
      }

      setOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const columnData = [
    {
      header: "Designation",
      name: "designation",
      className: "",
      commonClass: "",
      option: {
        sort: true,
      },
    },
    {
      header: "createdAt",
      name: "createdAt",
      className: "",
      commonClass: "",
      cell: (props: any) => {
        return FormatDate(props.createdAt);
      },
    },
    // {
    //   header: "Action",
    //   cell: (props: { designationID: string }) => {
    //     return (
    //       <div className="flex items-center gap-1.5">
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-black/10 text-dark p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => {
    //             setDesignationId(props.designationID);
    //             setOpenModal(true);
    //           }}
    //         >
    //           <EditIocn className="w-ful h-full pointer-events-none" />
    //         </span>
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-black/10 text-dark p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => {
    //             navigate("/admin/designation/office/" + props.designationID);
    //           }}
    //         >
    //           <IconEye className="w-ful h-full pointer-events-none" />
    //         </span>
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-red/10 text-red p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => handleOpenModal(props.designationID)}
    //         >
    //           <DeleteIcon className="w-ful h-full pointer-events-none" />
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Table
        headerData={columnData}
        bodyData={designationDataPage.data}
        // isButton={true}
        // buttonText="Add Designation"
        // buttonClick={() => {
        //   setDesignationId("");
        //   setOpenModal(true);
        // }}
        loader={loader}
        pagination={true}
        dataPerPage={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalPage={designationDataPage.totalPage}
        setSorting={setSorting}
        sortType={sortType}
        setSortingType={setSortingType}
      />
      {open && (
        <Modal
          variant={"Confirmation"}
          closeModal={() => setOpen(!open)}
          width="max-w-[475px]"
          icon={<DeleteIcon className="w-full h-full mx-auto" />}
          okbtnText="Yes"
          cancelbtnText="No"
          onClickHandler={() => designationDelete(designationId)}
          confirmationText="Are you sure you want to delete this Designation?"
          title="Delete"
        >
          <div className=""></div>
        </Modal>
      )}
      {/* {openModal && (
        <AddUpdateDesignation
          id={designationId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          fetchAllData={() => {
            fetchAllDesignation(queryString);
          }}
        />
      )} */}
    </>
  );
};

export default DesignationList;
