import Modal from "@/components/modal/Modal";
import { DeleteIcon, EditIocn, IconEye } from "@/components/svgIcons";
import Table from "@/components/table/Table";
import {
  currentPageCount,
  currentPageSelector,
} from "@/redux/slices/paginationSlice";
import {
  GetAllDepartment,
  DeleteDepartment,
  EditDepartmentData,
} from "@/services/departmentService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddUpdateDepartment from "./AddUpdateDepartment";
import { setDepartmentData } from "@/redux/slices/departmentSlide";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "@/helpers/Utils";

const DepartmentList = () => {
  const [limit, setLimit] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false); // For Add Update Department Modal
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const [open, setOpen] = useState(false); // For Delete Modal
  const [loader, setLoader] = useState<boolean>(true);
  const [sort, setSorting] = useState<string>("");
  const [sortType, setSortingType] = useState<boolean>(true);
  const navigate = useNavigate();

  const [departmentDataPage, setDepartmentDataPage] = useState<{
    data: any;
    totalPage: number;
    totalCount: number;
  }>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });
  const [departmentId, setDepartmentId] = useState<string>("");
  const queryString = `?limit=${limit}&page=${currentPage}&sort=${
    sortType ? "asc" : "desc"
  }&sortBy=${sort}`;
  useEffect(() => {
    dispatch(currentPageCount(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllDepartment(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit, sort, sortType]);

  async function fetchAllDepartment(query: string) {
    setLoader(true);
    const response = await GetAllDepartment(query);
    if (response?.data?.responseData) {
      const result = response?.data?.responseData;
      setDepartmentDataPage({
        data: result.data,
        totalCount: result.count,
        totalPage: result.lastPage,
      });
      dispatch(setDepartmentData(result.data));
    }
    setLoader(false);
  }

  const toggleButtonChange = (event: any, departmentID: any) => {
    if (event.target.checked) {
      statusChange(departmentID, true);
    } else {
      statusChange(departmentID, false);
    }
  };

  const statusChange = async (departmentID: any, status: any) => {
    try {
      let data = {
        isActive: status,
      };
      await EditDepartmentData(data, departmentID);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOpenModal = (id: string) => {
    setDepartmentId(id);
    setOpen(true);
  };

  const departmentDelete = async (id: string) => {
    try {
      const response = await DeleteDepartment(Number(id));
      if (response?.data?.response_type === "SUCCESS") {
        await fetchAllDepartment(queryString);
      }

      setOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const columnData = [
    {
      header: "Department",
      name: "department",
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
    //   cell: (props: { departmentID: string }) => {
    //     return (
    //       <div className="flex items-center gap-1.5">
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-black/10 text-dark p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => {
    //             setDepartmentId(props.departmentID);
    //             setOpenModal(true);
    //           }}
    //         >
    //           <EditIocn className="w-ful h-full pointer-events-none" />
    //         </span>
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-black/10 text-dark p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => {
    //             navigate("/admin/department/office/" + props.departmentID);
    //           }}
    //         >
    //           <IconEye className="w-ful h-full pointer-events-none" />
    //         </span>
    //         <span
    //           className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-red/10 text-red p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
    //           onClick={() => handleOpenModal(props.departmentID)}
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
        bodyData={departmentDataPage.data}
        // isButton={true}
        // buttonText="Add Department"
        // buttonClick={() => {
        //   setDepartmentId("");
        //   setOpenModal(true);
        // }}
        loader={loader}
        pagination={true}
        dataPerPage={limit}
        setLimit={setLimit}
        currentPage={currentPage}
        totalPage={departmentDataPage.totalPage}
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
          onClickHandler={() => departmentDelete(departmentId)}
          confirmationText="Are you sure you want to delete this Department?"
          title="Delete"
        >
          <div className=""></div>
        </Modal>
      )}
      {/* {openModal && (
        <AddUpdateDepartment
          id={departmentId}
          openModal={openModal}
          setOpenModal={setOpenModal}
          fetchAllData={() => {
            fetchAllDepartment(queryString);
          }}
        />
      )} */}
    </>
  );
};

export default DepartmentList;
