// import CheckBox from "@/components/formComponents/checkbox/CheckBox";
import SelectComponent from "@/components/formComponents/customSelect/Select";
import TextField from "@/components/formComponents/textField/TextField";
// import { countries } from "../../../src/json/country.json";
// import { Option } from "@/interface/customSelect/customSelect";
import Modal from "@/components/modal/Modal";
import Card from "@/components/card/Card";
import { Form, Formik, FormikValues } from "formik";
import DateComponent from "@/components/formComponents/dateComponent/DateComponent";
// import Textarea from "@/components/formComponents/textarea/Textarea";
// import { ICompanyData } from "@/interface/Company/CompanyInterface";
import { IconEye, IconEyeSlash, RoundUserIcon } from "@/components/svgIcons";

import {
  // AddCompanyData,
  EditEmployeeData,
  GetEmployeeDataById,
} from "@/services/employeeService";
import {
  GetAllOfficesById,
  GetCompanyListData,
} from "@/services/companyService";
import { GetRolesListData } from "@/services/roleService";

import { GetAllDepartment } from "@/services/departmentService";
import { GetAllDesignation } from "@/services/designationService";
import Button from "@/components/formComponents/button/Button";
import { RegisterValidationSchema } from "@/validations/auth/RegisterValidation";
import FileInput from "@/components/formComponents/fileInput/FileInput";
import { useEffect, useState } from "react";
import { RegisterUser } from "@/services/authService";

const defaultInitialValues: any = {
  firstName: "",
  lastName: "",
  email: "",
  birthdate: "",
  joiningDate: "",
  empCode: "",
  departmentID: "",
  designationID: "",
  mobileNo: "",
  companyID: "",
  officeID: "",
  roleId: "",
  empIDCard: {},
  empAadharCard: {},
  empProfileIMg: {},
};

interface AddUpdateCompanyProps {
  id?: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllData?: () => void;
}

const AddUpdateEmployee = ({
  id,
  openModal,
  setOpenModal,
  fetchAllData,
}: AddUpdateCompanyProps) => {
  const [employeeData, setEmployeeData] = useState<any>(defaultInitialValues);
  const [departmentData, setDepartmentData] = useState<any>([]);
  const [designationData, setDesignationData] = useState<any>([]);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [roleOptions, setRoleOptions] = useState<any[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  const [officeAddressOptions, setOfficeAddressOptions] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const OnSubmit = async (values: FormikValues) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("phone", values.mobileNo);
    formData.append("companyID", values.companyID);
    formData.append("officeID", values.officeID);
    formData.append("roleID", values.roleId);
    formData.append("empCode", values.empCode);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("birthDate", values.birthdate);
    formData.append("joiningDate", values.birthdate);
    formData.append("departmentID", values.departmentID);
    formData.append("designationID", values.designationID);
    formData.append("empIDCard", values.empIDCard);
    formData.append("empAadharCard", values.empAadharCard);
    formData.append("empProfileIMg", values.empProfileIMg);
    // console.log(formData);
    if (id) {
      const response = await EditEmployeeData(formData, id);
      if (response?.data?.response_type === "SUCCESS") {
        setOpenModal(false);
        fetchAllData?.();
      }
    } else {
      formData.append("password", values.password);
      formData.append("isActive", "false");
      const response = await RegisterUser(formData);
      if (response?.data?.response_type === "SUCCESS") {
        setOpenModal(false);
        fetchAllData?.();
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchCommonData();
  }, []);

  useEffect(() => {}, [departmentData, designationData]);

  useEffect(() => {
    if (id) {
      fetchEmployeeData(id);
    }
  }, [id]);

  useEffect(() => {
    if (companyId !== "" || companyId !== undefined || companyId !== null) {
      getAddressListByCompanyId(companyId);
    }
  }, [companyId]);

  async function fetchEmployeeData(id: string) {
    try {
      const response = await GetEmployeeDataById(id);

      if (response?.data?.data) {
        const resultData = response?.data?.data;
        await getAddressListByCompanyId(resultData.companyID);
        // alert(123);
        setEmployeeData({
          firstName: resultData.firstName,
          lastName: resultData.lastName,
          email: resultData.email,
          birthdate: resultData.birthDate,
          joiningDate: resultData.joiningDate,
          empCode: resultData.empCode,
          departmentID: resultData.departmentID,
          designationID: resultData.designationID,
          mobileNo: resultData.phone,
          companyID: resultData.companyID,
          officeID: resultData.officeID,
          roleId: resultData.roleID,
          empIDCard: {},
          empAadharCard: {},
          empProfileIMg: {},
        });
        // setProfileImage(resultData.profileImage);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async function fetchCommonData() {
    try {
      let response = await GetAllDepartment("");
      if (response?.data?.responseData) {
        const resultData = response?.data?.responseData.data;
        setDepartmentData(
          resultData.length <= 0
            ? []
            : resultData.map((value) => ({
                label: value.department,
                value: value.departmentID,
              }))
        );
      }
      response = await GetAllDesignation("");
      if (response?.data?.responseData) {
        const resultData = response?.data?.responseData.data;
        setDesignationData(
          resultData.length <= 0
            ? []
            : resultData.map((value) => ({
                label: value.designation,
                value: value.designationID,
              }))
        );
      }
      response = await GetCompanyListData();
      if (response?.data.response_type === "SUCCESS") {
        // console.log(response?.data.data.data);
        const temp = response?.data.responseData.data.map((value: any) => ({
          label: value.Name,
          value: value.companyID,
        }));
        setCompanyOptions(temp);
      }

      response = await GetRolesListData();
      if (response?.data.response_type === "SUCCESS") {
        const temp = response?.data.responseData.data.map((value: any) => ({
          label: value.role,
          value: value.roleID,
        }));
        setRoleOptions(temp);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getRolesList() {
    const response = await GetRolesListData();

    if (response?.data.response_type === "SUCCESS") {
      const temp = response?.data.responseData.data.map((value: any) => ({
        label: value.role,
        value: value.roleID,
      }));
      setRoleOptions(temp);
    }
  }

  const getAddressListByCompanyId = async (id: string) => {
    if (id) {
      const response = await GetAllOfficesById(Number(id));
      if (response?.data.response_type === "SUCCESS") {
        const temp = response?.data.responseData.data.map((value: any) => ({
          label: value.Address,
          value: value.officeID,
        }));
        setOfficeAddressOptions(temp);
      }
    }
  };

  return (
    <>
      {openModal && (
        <Modal
          hideFooterButton={true}
          width="max-w-[870px]"
          title={`${id ? "Edit" : "Add"} Employee`}
          closeModal={() => setOpenModal(false)}
        >
          <>
            <Formik
              initialValues={employeeData}
              enableReinitialize={true}
              validationSchema={RegisterValidationSchema()}
              onSubmit={OnSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Card title="Personal Details" parentClass="mb-5 last:mb-0">
                    <>
                      <div className="grid grid-cols-4 gap-5 mb-5">
                        <TextField
                          name="firstName"
                          parentClass="col-span-2"
                          type="text"
                          smallFiled={true}
                          label={"First Name"}
                          isCompulsory={true}
                          placeholder={"Enter First Name"}
                        />
                        <TextField
                          name="lastName"
                          parentClass="col-span-2"
                          type="text"
                          smallFiled={true}
                          label={"Last Name"}
                          isCompulsory={true}
                          placeholder={"Enter Last Name"}
                        />
                        <TextField
                          name="email"
                          parentClass="col-span-2"
                          type="text"
                          smallFiled={true}
                          label={"Email"}
                          isCompulsory={true}
                          placeholder={"Enter Email"}
                        />
                        <TextField
                          name="mobileNo"
                          parentClass="col-span-2"
                          type="text"
                          smallFiled={true}
                          label={"Contact Number"}
                          isCompulsory={true}
                          placeholder={"Enter Contact"}
                        />
                        <DateComponent
                          name={`birthdate`}
                          smallFiled
                          label={"Birth Date"}
                          parentClass="col-span-2"
                          // dateFormat="dd-MM-yy"
                          value={values.birthdate ? new Date() : null}
                          onChange={(date) => {
                            setFieldValue(`birthdate`, date);
                          }}
                          isCompulsory={true}
                          placeholder={"Enter Other Info (e.g. Month)"}
                        />
                        <DateComponent
                          name={`joiningDate`}
                          smallFiled
                          label={"Joining Date"}
                          parentClass="col-span-2"
                          // dateFormat="dd-MM-yy"
                          value={values.joiningDate ? new Date() : null}
                          onChange={(date) => {
                            setFieldValue(`joiningDate`, date);
                          }}
                          isCompulsory={true}
                          placeholder={"Enter Other Info (e.g. Month)"}
                        />
                        <Card title="Profile Image" parentClass="col-span-2 ">
                          <FileInput
                            setValue={(filed, file) => {
                              setFieldValue(filed, file);
                            }}
                            name="empProfileIMg"
                            value={null}
                            isImage={false}
                          />
                        </Card>
                      </div>
                    </>
                  </Card>
                  <Card title="Company Details" parentClass="mb-5 last:mb-0">
                    <>
                      <div className="grid grid-cols-3 gap-5">
                        <>
                          <TextField
                            name="empCode"
                            parentClass="col-span-1"
                            type="text"
                            smallFiled={true}
                            label={"EmpCode"}
                            isCompulsory={true}
                            placeholder={"Enter EmpCode"}
                          />
                          <SelectComponent
                            name="designationID"
                            options={designationData}
                            isCompulsory={true}
                            isMulti={false}
                            parentClass="col-span-1"
                            label="Designation"
                            selectedValue={values.designationID}
                            placeholder="Select"
                            onChange={(option: any) => {
                              console.log(option);
                              setFieldValue("designationID", option.value);
                            }}
                          />
                          <SelectComponent
                            name="roleId"
                            options={roleOptions}
                            isCompulsory={true}
                            isMulti={false}
                            parentClass="col-span-1"
                            label="Role"
                            placeholder="Select"
                            selectedValue={values.roleId}
                            onChange={(option: any) => {
                              setFieldValue("roleId", option.value);
                            }}
                          />
                          <SelectComponent
                            name="departmentID"
                            options={departmentData}
                            isCompulsory={true}
                            isMulti={false}
                            parentClass="col-span-1"
                            label="Department"
                            selectedValue={values.departmentID}
                            placeholder="Select"
                            onChange={(option: any) => {
                              console.log(option);
                              setFieldValue("departmentID", option.value);
                            }}
                          />
                          <SelectComponent
                            name="companyID"
                            options={companyOptions}
                            isCompulsory={true}
                            isMulti={false}
                            parentClass="col-span-1"
                            label="Company"
                            placeholder="Select"
                            selectedValue={values.companyID}
                            onChange={(option: any) => {
                              setFieldValue("companyID", option.value);
                              setCompanyId(String(option.value));
                            }}
                          />
                          <SelectComponent
                            parentClass="col-span-1"
                            name="officeID"
                            options={officeAddressOptions}
                            isCompulsory={true}
                            isMulti={false}
                            label="Office Addresses"
                            placeholder="Select"
                            selectedValue={values.officeID}
                            onChange={(option: any) => {
                              setFieldValue("officeID", option.value);
                            }}
                          />
                        </>
                      </div>
                    </>
                  </Card>
                  <Card title="Document Details" parentClass="mb-5 last:mb-0">
                    <>
                      <div className="grid grid-cols-3 gap-5">
                        <>
                          <Card title="ID Card" parentClass="col-span-1">
                            <FileInput
                              setValue={(filed, file) => {
                                setFieldValue(filed, file);
                              }}
                              name="empIDCard"
                              value={null}
                              isImage={false}
                            />
                          </Card>
                          <Card title="Adhar Card" parentClass="col-span-1">
                            <FileInput
                              setValue={(filed, file) => {
                                setFieldValue(filed, file);
                              }}
                              name="empAadharCard"
                              value={null}
                              isImage={false}
                            />
                          </Card>
                        </>
                      </div>
                    </>
                  </Card>
                  {!id && (
                    <Card title="Password" parentClass="mb-5 last:mb-0">
                      <>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          label="New Password"
                          name="password"
                          parentClass={"col-span-1"}
                          isCompulsory={true}
                          placeholder="New Password"
                          icon={
                            <div
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-10 rtl:left-4 rtl:right-auto cursor-pointer"
                            >
                              {showPassword ? <IconEye /> : <IconEyeSlash />}
                            </div>
                          }
                        />
                        <TextField
                          type={showConfirmPassword ? "text" : "password"}
                          label="Confirm Password"
                          name="confirmPassword"
                          parentClass={"col-span-1"}
                          isCompulsory={true}
                          placeholder="Confirm Password"
                          icon={
                            <div
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-4 top-10 rtl:left-4 rtl:right-auto cursor-pointer"
                            >
                              {showConfirmPassword ? (
                                <IconEye />
                              ) : (
                                <IconEyeSlash />
                              )}
                            </div>
                          }
                        />
                      </>
                    </Card>
                  )}

                  <div className={`flex gap-4 justify-start p-1`}>
                    <Button type="submit" variant={"primary"} loader={loader}>
                      Save
                    </Button>
                    <Button
                      variant={"primaryBorder"}
                      onClickHandler={() => setOpenModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        </Modal>
      )}
    </>
  );
};

export default AddUpdateEmployee;
