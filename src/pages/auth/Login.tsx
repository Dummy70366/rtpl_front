import { Formik, Form } from "formik";
import { useState } from "react";
import TextField from "../../components/formComponents/textField/TextField";
import Button from "../../components/formComponents/button/Button";
import { LoginValidationSchema } from "../../validations/auth/LoginValidation";
import { IconEye, IconEyeSlash } from "../../components/svgIcons";
import { Link, useNavigate } from "react-router-dom";
import { ILoginForm } from "@/interface/auth/loginInterface";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../services/authService";
import { setToken, setUser } from "@/redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const defaultInitialValues = {
    email: "",
    password: "",
  };
  async function OnSubmit(value: ILoginForm) {
    setLoader(true);
    const params = {
      email: value.email,
      password: value.password,
    };
    const response = await LoginUser(params);
    const { response_type, data } = response.data;
    if (response_type === "SUCCESS") {
      if (data) {
        dispatch(setToken(data?.access_token));
        dispatch(setUser(data.data));
        navigate("/");
      }
    }
    setLoader(false);
  }
  return (
    <div className="min-h-dvh bg-offWhite p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-100px flex 1200:items-center">
      <div className="max-w-[1545px] mx-auto w-full">
        <div className="flex flex-wrap justify-between">
          <div className="img-wrapper hidden 1200:block xl:max-w-[450px] 2xl:max-w-[669px] h-auto w-full">
            <img
              src="/assets/images/loginimg.jpg"
              width={669}
              height={669}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
          <div className="auth-box-wrap xl:max-w-[600px] 2xl:max-w-[720px] w-full">
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
                <p className="text-32px mb-4">Login to Rise and Glow Portal</p>

                <div className="input-list-wrapper mt-10 text-left">
                  <Formik
                    initialValues={defaultInitialValues}
                    validationSchema={LoginValidationSchema()}
                    onSubmit={OnSubmit}
                  >
                    {() => (
                      <Form>
                        <div className="input-item mb-30px">
                          <TextField
                            type={"text"}
                            label="Email"
                            name="email"
                            parentClass={"mb-6"}
                            isCompulsory={true}
                            placeholder="Email"
                          />
                        </div>
                        <div className="input-item">
                          <TextField
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            name="password"
                            parentClass={"mb-2.5"}
                            isCompulsory={true}
                            placeholder="Password"
                            icon={
                              <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 rtl:left-4 rtl:right-auto cursor-pointer"
                              >
                                {showPassword ? <IconEye /> : <IconEyeSlash />}
                              </div>
                            }
                          />
                        </div>

                        <div className="forgot-pass text-right mt-10px">
                          <Link
                            to="/forgot-password"
                            className="text-orange-600 font-semibold text-right inline-block"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <Button
                          variant={"primary"}
                          type="submit"
                          className="w-full !text-base/6"
                          parentClass="mt-10"
                          loader={loader}
                        >
                          Login
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="mt-5 modal-footer py-5 px-2 border-t border-primaryBlack1/20">
                <p className="text-center font-BinerkaDemo text-base">
                  <span className="inline-block text-primaryBlack1">
                    Don't have an account ?
                  </span>
                  <Link to="/register">
                    <span className="inline-block cursor-pointer text-inputBorder ms-1 text-primaryRed hover:underline ">
                      Get Started
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
