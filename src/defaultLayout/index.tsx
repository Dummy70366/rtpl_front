import { Outlet } from "react-router-dom";
import Header from "./wrapper/Header";
// import Footer from "./wrapper/Footer";
import LeftSideBar from "@/defaultLayout/leftSideBar/LeftSideBar";
import { useSelector } from "react-redux";
import { AdminSidebarSelector } from "@/redux/slices/adminSidebarSlice";

const LayOut: React.FC = () => {
  const AdminSideBarVar = useSelector(AdminSidebarSelector);
  return (
    <div>
      <div className={`flex p-4 bg-offWhite h-dvh overflow-auto max-w-[2000px] mx-auto`}>
        <LeftSideBar />
        <div className={` px-30px w-full h-fit transition-all duration-300 ${AdminSideBarVar ? ' max-w-[calc(100%_-_250px)] ' : 'max-w-[calc(100%_-_80px)]'}`}>
          <div className="main-wrapper">
            <Header />
            <div className="site-content">
              <Outlet />
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayOut;
