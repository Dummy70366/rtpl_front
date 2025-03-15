// import CheckBox from "@/components/formComponents/checkbox/CheckBox";
// import SelectComponent from "@/components/formComponents/customSelect/Select";
import TextField from "@/components/formComponents/textField/TextField";
// import { countries } from "../../../src/json/country.json";
// import { Option } from "@/interface/customSelect/customSelect";
import Modal from "@/components/modal/Modal";
import Card from "@/components/card/Card";
import { Form, Formik, FormikValues } from "formik";
// import DateComponent from "@/components/formComponents/dateComponent/DateComponent";
// import Textarea from "@/components/formComponents/textarea/Textarea";
// import { ICompanyData } from "@/interface/Company/CompanyInterface";
import {
  // AddCompanyData,
  EditEmployeeData,
  GetEmployeeDataById,
} from "@/services/employeeService";
import Button from "@/components/formComponents/button/Button";
import { CompanyValidationSchema } from "@/validations/company/CompanyValidation";
// import FileInput from "@/components/formComponents/fileInput/FileInput";
import { useEffect, useState } from "react";

const defaultInitialValues: any = {
  firstName: "",
  lastName: "",
  email:"",
  phone:""
};

interface AddUpdateCompanyProps {
  id?: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllData?: () => void;
}

const UpdateEmployee = ({
  id,
  openModal,
  setOpenModal,
  fetchAllData,
}: AddUpdateCompanyProps) => {
  const [CompanyData, setCompanyData] =
    useState<any>(defaultInitialValues);
  const [loader, setLoader] = useState<boolean>(false);

  const OnSubmit = async (values: FormikValues) => {
    setLoader(true);
    
    const formData = {
      firstName:values.firstName.trim(),
      lastName:values.lastName.trim(),
      email:values.email.trim(),
      phone:values.phone.trim()
    }
    if (id) {
      const response = await EditEmployeeData(formData, id);
      if (response?.data?.response_type === "GetEmployeeDataByIdCCESS") {
        setOpenModal(false);
        fetchAllData?.();
      }
    } else {
      // const response = await AddCompanyData(formData);
      // if (response?.data?.response_type === "SUCCESS") {
      //   setOpenModal(false);
      //   fetchAllData?.();
      // }
    }
    setLoader(false);
  };


  useEffect(() => {
    if (id) {
      fetchCompanyData(id);
    }
  }, [id]);

  async function fetchCompanyData(id: string) {
    try {
      const response = await GetEmployeeDataById(id);

      if (response?.data?.data) {
        const resultData = response?.data?.data;
        setCompanyData({
            Name: resultData.Name,
            email:resultData.email,
            phone:resultData.phone
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      {openModal && (
        <Modal
          hideFooterButton={true}
          width="max-w-[870px]"
          title={`${id ? "Edit" : "Add"} Company`}
          closeModal={() => setOpenModal(false)}
        >
          <Formik
            initialValues={CompanyData}
            enableReinitialize={true}
            validationSchema={CompanyValidationSchema()}
            onSubmit={OnSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Card title="Details" parentClass="mb-5 last:mb-0">
                  <div className="grid grid-cols-2 gap-5">
                    <TextField
                      name="Name"
                      parentClass="col-span-2"
                      type="text"
                      smallFiled={true}
                      label={"Name"}
                      isCompulsory={true}
                      placeholder={"Enter Name"}
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
                      name="phone"
                      parentClass="col-span-2"
                      type="text"
                      smallFiled={true}
                      label={"Contact Number"}
                      isCompulsory={true}
                      placeholder={"Enter Contact"}
                    />
                   
                  </div>
                </Card>
              
              
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
        </Modal>
      )}
    </>
  );
};

export default UpdateEmployee;
