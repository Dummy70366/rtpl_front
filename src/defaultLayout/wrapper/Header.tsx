import {
  ArrowDownIcon,
  LockIocn,
  LogoutIocn,
  RoundUserIcon,
  SingleUserIocn,
} from "@/components/svgIcons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeToken,
  setToken,
  setUser,
  userSelector,
} from "@/redux/slices/userSlice";
import ChangePassword from "@/pages/auth/ChangePassword";
import { useState } from "react";
import BreadCrumbs from "@/components/breadCrumbs/BreadCrumbs";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const user = useSelector(userSelector);
  console.log(user);
  const signOut = () => {
    try {
      dispatch(removeToken());
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <header className="mb-6">
        <div className="flex justify-between py-4 border-b border-solid border-black/10">
          <BreadCrumbs />

          <div className="account">
            <div className="group relative after:content-[''] after:h-4 after:block after:w-full after:absolute after:top-full">
              <div className="flex items-center cursor-pointer text-primaryRed">
                <span className="w-8 h-8">
                  <RoundUserIcon className="w-full h-full" />
                </span>
                <span className="text-current text-xl/26px ml-2 mr-1 font-medium">
                  {user?.name}
                </span>
                <span className="w-10px h-auto">
                  <ArrowDownIcon className="w-full h-full" />
                </span>
              </div>
              <div className="bg-white rounded-10 shadow-menu absolute top-[calc(100%_+_15px)] min-w-[200px] right-0 transition-all duration-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-2">
                <span className="absolute -top-2 right-5 border-r-[8px] border-b-[8px] border-l-[8px] border-transparent border-b-white"></span>
                <ul className="py-2">
                  <li className="flex items-center relative px-5 cursor-pointer hover:bg-gray-100 before:absolute before:content-[''] before:w-10/12 before:left-0 before:right-0 before:mx-auto before:h-px before:bg-gray-200 before:top-full last:before:hidden">
                    <span className="w-5 h-5 text-themeColor mr-3">
                      <SingleUserIocn className="w-full h-full" />
                    </span>
                    <span className="inline-block w-full whitespace-nowrap font-semibold max-w-[calc(100%_-_32px)] leading-40px text-sm text-black">
                      {user?.email}
                    </span>
                  </li>
                  <li
                    className="flex items-center relative px-5 cursor-pointer hover:bg-gray-100 before:absolute before:content-[''] before:w-10/12 before:left-0 before:right-0 before:mx-auto before:h-px before:bg-gray-200 before:top-full last:before:hidden"
                    onClick={() => setOpenChangePasswordModal(true)}
                  >
                    <span className="w-5 h-5 text-themeColor mr-3">
                      <LockIocn className="w-full h-full" />
                    </span>
                    <span className="inline-block w-full whitespace-nowrap font-semibold max-w-[calc(100%_-_32px)] leading-40px text-sm text-black">
                      Change Password
                    </span>
                  </li>
                  <li className="flex items-center relative px-5 cursor-pointer hover:bg-gray-100 before:absolute before:content-[''] before:w-10/12 before:left-0 before:right-0 before:mx-auto before:h-px before:bg-gray-200 before:top-full last:before:hidden">
                    <span className="w-5 h-5 text-themeColor mr-3">
                      <LogoutIocn className="w-full h-full" />
                    </span>
                    <span
                      className="inline-block w-full whitespace-nowrap font-semibold max-w-[calc(100%_-_32px)] leading-40px text-sm text-black"
                      onClick={signOut}
                    >
                      Log off
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ChangePassword
          openModal={openChangePasswordModal}
          closeModal={() => setOpenChangePasswordModal(false)}
        />
      </header>
    </>
  );
};

export default Header;
