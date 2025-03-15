// import TextField from "@/components/formComponents/textField/TextField";
import Modal from "@/components/modal/Modal";
import Card from "@/components/card/Card";
import { Form, Formik, FormikValues } from "formik";
import Textarea from "@/components/formComponents/textarea/Textarea";
import {
  AddOfficeData
} from "@/services/companyService";
import Button from "@/components/formComponents/button/Button";
// import { CompanyValidationSchema } from "@/validations/company/CompanyValidation";
import { useEffect, useState } from "react";

const defaultInitialValues: any = {
  Address: "",
};

interface AddUpdateOfficeProps {
  id?: string;
  openModal: boolean;
  companyId:string
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllData?: () => void;
}

const AddUpdateOffice = ({
  id,
  openModal,
  companyId,
  setOpenModal,
  fetchAllData,
}: AddUpdateOfficeProps) => {
  const [CompanyData, setCompanyData] =
    useState<any>(defaultInitialValues);
  const [loader, setLoader] = useState<boolean>(false);

  const OnSubmit = async (values: FormikValues) => {
    setLoader(true);
    
    const formData = {
        Address:values.address.trim(),
        companyID:companyId
    }
    if (id) {
      // const response = await EditCompanyData(formData, id);
      // if (response?.data?.response_type === "SUCCESS") {
      //   setOpenModal(false);
      //   fetchAllData?.();
      // }
    } else {
      const response = await AddOfficeData(formData);
      if (response?.data?.response_type === "SUCCESS") {
        setOpenModal(false);
        fetchAllData?.();
      }
    }
    setLoader(false);
  };


  // useEffect(() => {
  //   if (id) {
  //     fetchCompanyData(id);
  //   }
  // }, [id]);

  // async function fetchCompanyData(id: string) {
  //   try {
  //     const response = await GetCompanyDataById(id);
  //     console.log(response);

  //     if (response?.data?.data) {
  //       const resultData = response?.data?.data;
  //       setCompanyData({
  //           Name: resultData.Name,
  //           email:resultData.email,
  //           contact:resultData.contact
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

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
            // validationSchema={CompanyValidationSchema()}
            onSubmit={OnSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Card title="Details" parentClass="mb-5 last:mb-0">
                  <div className="grid grid-cols-2 gap-5">
                  <Textarea
                      parentClass="col-span-2"
                      name="address"
                      type="text"
                      smallFiled={true}
                      placeholder={"Enter Address"}
                      label={"Address"}
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

export default AddUpdateOffice;
