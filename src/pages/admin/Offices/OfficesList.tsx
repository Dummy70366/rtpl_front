import Modal from "@/components/modal/Modal";
import { DeleteIcon, EditIocn,LeftArrowIcon } from "@/components/svgIcons";
import Table from "@/components/table/Table";
import {
  currentPageCount,
  currentPageSelector,
} from "@/redux/slices/paginationSlice";
import { GetAllOfficesById,DeletOffice,EditOfficeData } from "@/services/companyService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AddUpdateCompany from "../Company/AddUpdateCompany";
import AddUpdateOffice from "./AddUpdateOffice";
import { setCompanyData } from "@/redux/slices/companySlice";
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

const OfficeList = () => {
  const { id } = useParams();
  const [limit, setLimit] = useState<number>(10);
  const [openModal, setOpenModal] = useState<boolean>(false); // For Add Update Office Modal
  const dispatch = useDispatch();
  const currentPage = useSelector(currentPageSelector);
  const [open, setOpen] = useState(false); // For Delete Modal
  const [loader, setLoader] = useState<boolean>(true);
  const [sort, setSorting] = useState<string>("");
  const [sortType, setSortingType] = useState<boolean>(true);
    const navigate = useNavigate();

  const [officeDataPage, setOfficeDataPage] = useState<{
    data: any;
    totalPage: number;
    totalCount: number;
  }>({
    data: [],
    totalPage: 0,
    totalCount: 0,
  });
  const [officeId, setOfficeId] = useState<string>("");
  const queryString =
  `?limit=${limit}&page=${currentPage}&sort=${
    sortType ? "asc" : "desc"
  }&sortBy=${sort}`;
  useEffect(() => {
    dispatch(currentPageCount(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(id)
    console.log(id);
    fetchAllOffice(id,queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit,  sort, sortType]);

  async function fetchAllOffice(id:any,query: string) {
    setLoader(true);
    const response = await GetAllOfficesById(id,query);
    if (response?.data?.responseData) {
      const result = response?.data?.responseData;
      setOfficeDataPage({
        data: result.data,
        totalCount: result.count,
        totalPage: result.lastPage,
      });
      dispatch(setCompanyData(result.data));
    }
    setLoader(false);
  }


  const toggleButtonChange  = ( event :any, companyID:any)=>{
    if(event.target.checked)
    {
      statusChange(companyID,true);
    }
    else
    {
      statusChange(companyID,false);
    }
  }


  const statusChange = async (companyID:any,status:any) =>{
    try {
      let data ={
        isActive:status
      }
      await EditOfficeData(data,companyID);

    } catch (error) {
      console.log("error", error);
    }
    
  }

  const handleOpenModal = (id: string) => {
    setOfficeId(id);
    setOpen(true);
  };

  const officeDelete = async (id: string) => {
    try {
      const response = await DeletOffice(Number(id));
      if (response?.data?.response_type === "SUCCESS") {
        await fetchAllOffice(id,queryString);
      }
      
      setOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const columnData = [
    {
      header: "Address",
      name: "Address",
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
    },
    {
      header: "isActive",
      name: "isActive",
      className: "",
      commonClass: "",
      cell: (props: { companyID: string; isActive: boolean;}) => {
        return (
          <div className="flex items-center gap-1.5">
            
              
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={props.isActive} readOnly onChange={(e)=>{toggleButtonChange(e,props.companyID)}} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
            
            
            
          </div>
        );
      },

    },
    {
      header: "Action",
      cell: (props: { companyID: string;}) => {
        return (
          <div className="flex items-center gap-1.5">
            <span
              className="w-7 h-7 inline-flex cursor-pointer items-center justify-center active:scale-90 transition-all duration-300 origin-center hover:bg-red/10 text-red p-1 rounded active:ring-2 active:ring-current active:ring-offset-2"
              onClick={() => handleOpenModal(props.companyID)}
            >
              <DeleteIcon className="w-ful h-full pointer-events-none" />
            </span>
          </div>
        );
      },
    },
  ];


  return (
    <>

      <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
       onClick={() =>navigate('/admin/company')}
      >
      <LeftArrowIcon className="w-ful h-full pointer-events-none" />
      
      </button>

    <Table
      headerData={columnData}
      bodyData={officeDataPage.data}
      isButton={true}
      buttonText="Add Office"
      buttonClick={() => {
        setOfficeId("");
        setOpenModal(true);
      }}
      loader={loader}
      pagination={true}
      dataPerPage={limit}
      setLimit={setLimit}
      currentPage={currentPage}
      totalPage={officeDataPage.totalPage}
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
        onClickHandler={() => officeDelete(officeId)}
        confirmationText="Are you sure you want to delete this Company?"
        title="Delete"
      >
        <div className=""></div>
      </Modal>
    )}
    {openModal && (
      <AddUpdateOffice
        // id={officeId}
        openModal={openModal}
        companyId={id}
        setOpenModal={setOpenModal}
        fetchAllData={() => {
          fetchAllOffice(id,queryString);
        }}
      />
    )}
  </>
  );
};

export default OfficeList;

