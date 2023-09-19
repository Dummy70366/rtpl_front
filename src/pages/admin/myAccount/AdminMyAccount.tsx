// import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Card from "@/components/card/Card";
import Button from "@/components/formComponents/button/Button";
import TextField from "@/components/formComponents/textField/TextField";
import ProfileUploadFile from "@/components/formComponents/uploadFile/ProfileUploadFile";
import { EditIcon } from "@/components/svgIcons";
// import { EnumFileType } from "@/enum/fileTypeEnum";
// import { languageSelector } from "@/redux/slices/languageTranslationSlice";
import { hideLoader, showLoader } from "@/redux/slices/siteLoaderSlice";
import { setUser, userSelector } from "@/redux/slices/userSlice";
import { GetCurrentUser } from "@/services/authService";
// import { UpdateProfileData } from "@/services/userService";
// import { adminAccountValidationSchema } from "@/validations/admin/adminAccountValidationSchema";
import { Formik, Form, FormikValues } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const defaultInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  profileImage: null,
};

const AdminMyAccount = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const language = useSelector(languageSelector);
  const [loader, setLoader] = useState<boolean>(false);
  // const [userData, setUserData] = useState(defaultInitialValues);
  const userData = useSelector(userSelector);
  const id = userData.empID;

  useEffect(() => {
    // fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log(user);
  }, []);

  // const fetchUserData = async () => {
  //   dispatch(showLoader());
  //   try {
  //     // const response = await GetCurrentUser();
  //     // const { response_type, responseData } = response.data;
  //     // if (response_type === "success" && responseData) {
  //     //   setUserData({
  //     //     ...response?.data?.responseData,
  //     //   });
  //     //   setId(responseData.id);
  //     // }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  //   dispatch(hideLoader());
  // };

  const editProfileDataSubmit = async (values: FormikValues) => {
    setLoader(true);
    if (id) {
      // const bodydata = new FormData();
      // bodydata.append("firstName", values.firstName);
      // bodydata.append("lastName", values.lastName);
      // bodydata.append(
      //   "profile",
      //   values.profileImage ? values.profileImage : null
      // );
      console.log(values);

      // const response = await UpdateProfileData(id, bodydata);
      // if (response.data.response_type == "success") {
      //   response.data.responseData &&
      //     dispatch(setUser(response.data.responseData));
      //   fetchUserData();
      // }
    }
    setLoader(false);
  };

  return (
    <>
      <Card parentClass="!pt-5 bg-white rounded-lg">
        <>
          <div className="border-b border-black/05 pb-3 card-header mb-7 flex justify-between">
            <p className="sm:text-[25px] sm:leading-[32px] text-22px leading-28px font-BinerkaDemo tracking-04em text-black">
              My Account
            </p>
          </div>
          <Formik
            initialValues={userData}
            enableReinitialize={true}
            // validationSchema={adminAccountValidationSchema(t)}
            onSubmit={editProfileDataSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="flex flex-wrap">
                  <div className="xl:w-[350px] w-full">
                    <div className="mb-10">
                      <div className="relative overflow-hidden mb-4">
                        <ProfileUploadFile
                          Title={"Profile Image"}
                          setValue={setFieldValue}
                          name="profileImage"
                          value={values?.profileImage}
                          acceptTypes=".jpg,.jpeg,.png"
                          id={"dropzone-file"}
                          letterText={
                            userData?.firstName.charAt(0) +
                            userData?.lastName.charAt(0)
                          }
                          // fileType={EnumFileType.Image}
                        />
                      </div>
                      <div className="flex items-center cursor-pointer max-w-[212px] ps-3">
                        <span className="text-primaryGold pe-3">
                          <EditIcon />
                        </span>
                        <label
                          className="text-black/60 cursor-pointer"
                          htmlFor="dropzone-file"
                        >
                          {"Update Profile Picture"}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="xl:w-[calc(100%_-_350px)] w-full">
                    <div className="grid grid-cols-2 gap-5">
                      <>
                        <TextField
                          type={"text"}
                          label={"First Name"}
                          name="firstName"
                          className="col-span-1"
                          isCompulsory={true}
                          placeholder={"First Name"}
                        />
                        <TextField
                          type={"text"}
                          label={"Last Name"}
                          name="lastName"
                          className="col-span-1"
                          isCompulsory={true}
                          placeholder={"Last Name"}
                        />
                        <TextField
                          type={"emil"}
                          label={"Email"}
                          name="email"
                          className="col-span-1"
                          disabled={true}
                          isCompulsory={true}
                          placeholder={"Email"}
                        />
                        <TextField
                          type={"phone"}
                          label={"Phone"}
                          name="phone"
                          className="col-span-1"
                          disabled={true}
                          isCompulsory={true}
                          placeholder={"Phone"}
                        />
                        <TextField
                          type={"role"}
                          label={"Role"}
                          name="role.role"
                          className="col-span-1"
                          disabled={true}
                          isCompulsory={true}
                          placeholder={"Role"}
                        />
                        <TextField
                          type={"company"}
                          label={"Company"}
                          name="company.Name"
                          className="col-span-1"
                          disabled={true}
                          isCompulsory={true}
                          placeholder={"Company"}
                        />
                      </>
                    </div>
                    <div className="flex flex-wrap my-5">
                      <div className="w-full flex gap-4 justify-end p-1">
                        <Button
                          type="submit"
                          className="!px-[22px] !font-ArsenicaTrialM"
                          loader={loader}
                          variant={"primary"}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      </Card>
    </>
  );
};

export default AdminMyAccount;
