import Button from "@/components/formComponents/button/Button";
import SelectComponent from "@/components/formComponents/customSelect/Select";
import TextField from "@/components/formComponents/textField/TextField";
import { IconEye, IconEyeSlash } from "@/components/svgIcons";
import { IRegisterForm } from "@/interface/auth/registerInterface";
import { Option } from "@/interface/customSelect/customSelect";
import {
  GetAllOfficesById,
  GetCompanyListData,
} from "@/services/companyService";
import { RegisterUser } from "@/services/authService";
import { RegisterValidationSchema } from "@/validations/auth/RegisterValidation";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetRolesListData } from "@/services/roleService";

const Register = () => {
  // const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [companyOptions, setCompanyOptions] = useState<Option[]>([]);
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);
  const [companyId, setCompanyId] = useState<string>("");
  const [officeAddressOptions, setOfficeAddressOptions] = useState<Option[]>(
    []
  );
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const defaultInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    empCode: "",
    department: "",
    designation: "",
    mobileNo: null,
    companyName: "",
    officeAddress: "",
    roleId: "",
  };

  useEffect(() => {
    getCompanyList();
    getRolesList();
  }, []);

  useEffect(() => {
    console.log(companyId, "companyId");
    if (companyId !== "" || companyId !== undefined || companyId !== null) {
      getAddressListByCompanyId(companyId);
    }
  }, [companyId]);

  async function getCompanyList() {
    const response = await GetCompanyListData();
    if (response?.data.response_type === "SUCCESS") {
      console.log(response?.data.data.data);
      const temp = response?.data.data.data.map((value: any) => ({
        label: value.Name,
        value: value.companyID,
      }));
      console.log(temp);
      setCompanyOptions(temp);
    }
  }
  async function getRolesList() {
    const response = await GetRolesListData();

    if (response?.data.response_type === "SUCCESS") {
      const temp = response?.data.data.data.map((value: any) => ({
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
        const temp = response?.data.data.data.map((value: any) => ({
          label: value.Address,
          value: value.officeID,
        }));
        setOfficeAddressOptions(temp);
      }
    }
  };

  async function OnSubmit(data: IRegisterForm) {
    console.log(data, "data while submit");
    setLoader(true);
    const params = {
      phone: data.mobileNo,
      companyID: data.companyName,
      officeID: data.officeAddress,
      roleID: data.roleId,
      empCode: data.empCode,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      // designataion: data.designation,
      designtaion: data.designation,
      password: data.password,
    };
    const response = await RegisterUser(params);
    console.log(response.data, "response.data");
    setLoader(false);
  }
  return (
    <div>
      <>
        <div className="min-h-dvh bg-offWhite p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-50px flex 1200:items-center">
          <div className="max-w-[1545px] mx-auto w-full">
            <div className="flex flex-wrap justify-between">
              <div className="img-wrapper hidden 1200:block xl:max-w-[450px] 2xl:max-w-[669px] h-auto w-full">
                <img
                  src="/assets/images/register.jpg"
                  width={669}
                  height={669}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
              {/* <div className="auth-box-wrap xl:max-w-[600px] 2xl:max-w-[720px]  w-full "> */}
              <div className="auth-box-wrap xl:max-w-[600px] 2xl:max-w-[720px] xl:max-h-[500px] 2xl:max-h-[620px] w-full overflow-scroll">
                <div className="bg-white w-full py-8 xl:py-12 2xl:py-16 rounded-15">
                  <div className="max-w-[460px] mx-auto text-center">
                    <div className="logo mb-5">
                      <img
                        src="/assets/images/riseglow-removebg-preview.png"
                        className="mx-auto max-w-[159px]"
                        width={159}
                        height={57}
                        alt=""
                      />
                    </div>
                    <p className="text-30px mb-4">
                      Register to Rise and Glow Portal
                    </p>

                    <div className="input-list-wrapper mt-10 text-left">
                      <Formik
                        initialValues={defaultInitialValues}
                        onSubmit={OnSubmit}
                        validationSchema={RegisterValidationSchema}
                      >
                        {({ setFieldValue, values }) => (
                          <Form>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="First Name"
                                name="firstName"
                                isCompulsory={true}
                                placeholder="First Name"
                              />
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="Last Name"
                                name="lastName"
                                isCompulsory={true}
                                placeholder="Last Name"
                              />
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"email"}
                                label="Email"
                                name="email"
                                isCompulsory={true}
                                placeholder="Email"
                              />
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="Mobile Number"
                                name="mobileNo"
                                isCompulsory={true}
                                placeholder="Mobile Number"
                              />
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="Employee Code"
                                name="empCode"
                                isCompulsory={true}
                                placeholder="Employee Code"
                              />{" "}
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="Department"
                                name="department"
                                isCompulsory={true}
                                placeholder="Department"
                              />{" "}
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={"text"}
                                label="Designation"
                                name="designation"
                                isCompulsory={true}
                                placeholder="Designation"
                              />{" "}
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={showPassword ? "text" : "password"}
                                label="Create Password"
                                name="password"
                                isCompulsory={true}
                                placeholder="Create Password"
                                icon={
                                  <div
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-10 rtl:left-4 rtl:right-auto cursor-pointer"
                                  >
                                    {showPassword ? (
                                      <IconEye />
                                    ) : (
                                      <IconEyeSlash />
                                    )}
                                  </div>
                                }
                              />{" "}
                            </div>
                            <div className="input-item">
                              <TextField
                                parentClass={"mb-6"}
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                name="confirmPassword"
                                isCompulsory={true}
                                placeholder="Confirm Password"
                                icon={
                                  <div
                                    onClick={() =>
                                      setShowConfirmPassword(
                                        !showConfirmPassword
                                      )
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
                              />{" "}
                            </div>
                            <div className="input-item">
                              <SelectComponent
                                name="companyName"
                                options={companyOptions}
                                isCompulsory={true}
                                isMulti={false}
                                parentClass="mb-6"
                                label="Company"
                                placeholder="Select"
                                selectedValue={values.companyName}
                                onChange={(option: Option | Option[]) => {
                                  setFieldValue(
                                    "companyName",
                                    (option as Option).value
                                  );
                                  setCompanyId(
                                    String((option as Option).value)
                                  );
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <SelectComponent
                                parentClass="mb-6"
                                name="officeAddress"
                                options={officeAddressOptions}
                                isCompulsory={true}
                                isMulti={false}
                                label="Office Addresses"
                                placeholder="Select"
                                selectedValue={values.officeAddress}
                                onChange={(option: Option | Option[]) => {
                                  setFieldValue(
                                    "officeAddress",
                                    (option as Option).value
                                  );
                                }}
                              />{" "}
                            </div>
                            <div className="input-item">
                              <SelectComponent
                                name="roleId"
                                options={roleOptions}
                                isCompulsory={true}
                                isMulti={false}
                                parentClass="mb-6"
                                label="Role"
                                placeholder="Select"
                                selectedValue={values.roleId}
                                onChange={(option: Option | Option[]) => {
                                  setFieldValue(
                                    "roleId",
                                    (option as Option).value
                                  );
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <Button
                                variant={"primary"}
                                type="submit"
                                className="w-full !text-base/6"
                                parentClass="mt-10"
                                loader={loader}
                              >
                                Register
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div className="modal-footer py-5 px-2 border-t border-primaryBlack1/20">
                    <p className="text-center font-BinerkaDemo text-base">
                      <span className="inline-block text-primaryBlack1">
                        Already have an account ?
                      </span>
                      <Link to="/login">
                        <span className="inline-block cursor-pointer text-inputBorder ms-1 text-primaryRed hover:underline ">
                          Login
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="modal-footer py-5 px-2 border-t border-primaryBlack1/20">
                  <p className="text-center font-BinerkaDemo text-base">
                    <span className="inline-block text-primaryBlack1">
                      Register to Visit ?
                    </span>
                    <Link to="/login">
                      <span className="inline-block cursor-pointer text-inputBorder ms-1 text-primaryRed hover:underline ">
                        Visitor Registration
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
