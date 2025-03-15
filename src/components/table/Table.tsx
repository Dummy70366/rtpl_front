import { useEffect, useState } from "react";
import Button from "../formComponents/button/Button";
import SelectComponent from "../formComponents/customSelect/Select";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchbar/SearchBar";
import { ArrowSortUpIcon, CloudDownIocn, PlusIcon } from "../svgIcons";
import Tab from "../tab/Tab";
import { Link } from "react-router-dom";
import DateRange from "../formComponents/dateRange/DateRange";
// import ClientDropdown from "../dropdown/ClientDropdown";
import { Option } from "@/interface/customSelect/customSelect";
// import SegmentDropdown from "../dropdown/SegmentDropdown";
import { ITableProps } from "@/interface/table/tableInterface";
// import EmployeeDropdown from "../dropdown/EmployeeDropdown";
import { setActiveTab } from "@/redux/slices/adminSidebarSlice";
import { useDispatch } from "react-redux";
import { VITE_APP_API_URL } from "@/config";

const Table = ({
  bodyData,
  headerData,
  isButton,
  loader,
  buttonLink,
  buttonClick,
  buttonText,
  isExport,
  isDateRange,
  isSearch,
  isTab,
  setTab,
  isDropdown,
  dropDownList,
  dropDownValue,
  setDropdownValue,
  dataPerPage,
  totalPage,
  pagination,
  currentPage,
  setLimit,
  // isClientDropdown = false,
  // isSegmentDropdown = false,
  // isEmployeeDropdown = false,
  // isEmployeeMedicalStatus = false,
  setSorting,
  sortType,
  setSortingType,
  addSubSegment = false,
  dateFilter,
  setDateFilter,
  tableLastTheadClass,
  summaryTableType,
  isUploadFileHeader,
  setOpenModal,
  setDocumentId,
}: ITableProps) => {
  const dispatch = useDispatch();
  const [tableHeaderData, setTableHeaderData] = useState<object[]>([]);
  const [tableBodyData, setTablebodyData] = useState<any[]>([]);
  useEffect(() => {
    if (bodyData) {
      setTablebodyData(bodyData);
    }
    if (headerData) {
      setTableHeaderData(headerData);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const loadTime = setTimeout(() => {}, 1000);
    return () => {
      clearTimeout(loadTime);
    };
  }, [bodyData, headerData]);
  const getImagePath = (path: string) => {
    if (path) {
      return `${VITE_APP_API_URL}/${path}`;
    } else {
      return "/assets/images/user.png";
    }
  };
  return (
    <>
      <div className="main-table">
        <div className="flex justify-between mb-4">
          <div className="flex flex-wrap 1400:flex-nowrap gap-4 items-center">
            {isDropdown && (
              <SelectComponent
                // name={""}
                isMulti={true}
                options={dropDownList ? dropDownList : []}
                selectedValue={dropDownValue}
                onChange={(option: Option | Option[]) => {
                  setDropdownValue?.((option as Option).value);
                }}
                parentClass="1300:w-[200px] 1400:w-[270px] 1700:w-[340px]"
              />
            )}
            {/* {isClientDropdown && <ClientDropdown />} */}
            {/* {isSegmentDropdown && <SegmentDropdown />} */}
            {/* {isEmployeeDropdown && (
              <EmployeeDropdown isShowMedicalStatus={isEmployeeMedicalStatus} />
            )} */}
            {isTab && <Tab setTab={setTab} />}
            {isDateRange && (
              <DateRange
                className="max-w-[147px]"
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            )}
          </div>
          <div className="flex flex-wrap 1400:flex-nowrap gap-4">
            {isSearch && <SearchBar inputClass="w-[300px]" />}
            {isExport && (
              <Button
                variant={"gray"}
                parentClass=""
                icon={<CloudDownIocn className="w-4 h-4" />}
              >
                Export to Excel
              </Button>
            )}
            {addSubSegment && (
              <Link to="/sub-segments">
                <Button
                  variant={"primary"}
                  parentClass=""
                  icon={<PlusIcon />}
                  onClickHandler={() => dispatch(setActiveTab("Sub-segments"))}
                >
                  Add Sub Segment
                </Button>
              </Link>
            )}
            {isButton && (
              <Link to={buttonLink ? buttonLink : "#"} onClick={buttonClick}>
                <Button variant={"primary"} parentClass="" icon={<PlusIcon />}>
                  {buttonText ? buttonText : ""}
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="table-wrapper overflow-auto">
          <table width={"100%"} className={`min-w-[800px]`}>
            <thead>
              <tr>
                {tableHeaderData.map((val: any, index: number) => {
                  return (
                    <th key={val.header + index} className="group/sort">
                      {isUploadFileHeader && val.header === "Upload File" ? (
                        <span
                          className={`flex items-center select-none text-primaryRed underline${
                            tableLastTheadClass ? tableLastTheadClass : ""
                          }`}
                          onClick={() => {
                            setOpenModal && setOpenModal(true);
                            setDocumentId && setDocumentId("");
                          }}
                        >
                          {val.header}
                        </span>
                      ) : (
                        <span
                          className={`flex items-center select-none ${
                            tableLastTheadClass ? tableLastTheadClass : ""
                          }`}
                        >
                          {val.header}
                          <span
                            onClick={() => {
                              setSorting?.(val.name);
                              setSortingType?.(!sortType);
                            }}
                          >
                            {val?.option?.sort && (
                              <ArrowSortUpIcon
                                className={`transition-all duration-300 opacity-0 group-hover/sort:opacity-100 ${
                                  sortType && "rotate-180"
                                }`}
                              />
                            )}
                          </span>

                          {/* for sorting Add class 'rotate-180' */}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {loader && <></>}
              {!loader && tableBodyData.length === 0 && (
                <tr>
                  <td className="" colSpan={tableHeaderData.length}>
                    <div className="py-4 text-center  rounded-10px border mt-4 border-black/[0.08]">
                      <img
                        src={`https://cdn-icons-png.flaticon.com/512/7486/7486754.png `}
                        className="w-[100px] m-auto mb-4"
                        alt=""
                      />
                      <span className="text-black">No Data Found</span>
                    </div>
                  </td>
                </tr>
              )}
              {!loader && tableBodyData && tableBodyData.length > 0 && (
                <>
                  {tableBodyData.map(
                    (row: { [key: string]: string }, rowIndex: number) => {
                      return (
                        <tr key={rowIndex + 1}>
                          {tableHeaderData.map(
                            (columnCell: any, colIndex: number) => {
                              return (
                                <td key={colIndex + 1}>
                                  {" "}
                                  {columnCell.cell ? (
                                    columnCell.cell(row)
                                  ) : (
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: `${
                                          colIndex === 0 && columnCell.imagePath
                                            ? `<div style="display: flex; align-items: center; gap: 0.5rem;" >
                                              <img
                                                  src="${getImagePath(
                                                    row[columnCell.imagePath]
                                                  )}"
                                                  width="40"
                                                  height="40"
                                                  style="border-radius: 30px;"
                                                  alt=""
                                                  />`
                                            : ""
                                        }
                                          ${
                                            row[columnCell.name]
                                              ? columnCell.subString
                                                ? row[columnCell.name]
                                                : row[columnCell.name].length >
                                                  25
                                                ? row[
                                                    columnCell.name
                                                  ].substring(0, 25) + "..."
                                                : row[columnCell.name]
                                              : "-"
                                          }
                                          ${
                                            colIndex === 0 &&
                                            columnCell.imagePath
                                              ? "</div>"
                                              : ""
                                          }`,
                                      }}
                                    ></p>
                                  )}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      );
                    }
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {pagination && totalPage ? (
          <Pagination
            summaryTableType={summaryTableType}
            setLimit={setLimit ? setLimit : () => undefined}
            currentPage={currentPage ? currentPage : 1}
            dataPerPage={dataPerPage ? dataPerPage : 10}
            totalPages={totalPage}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Table;
