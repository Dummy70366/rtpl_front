import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveTabSelector,
  AdminSidebarSelector,
  hideAdminSidebar,
  setActiveTab,
  showAdminSidebar,
} from "@/redux/slices/adminSidebarSlice";

import { ArrowDownIcon, SidebarTriggerArrow } from "@/components/svgIcons";
import { Link } from "react-router-dom";
import { MenuList } from "@/constants/DropdownConstants";

const AdminSideBar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState<null | string>(null);
  const AdminSideBarVar = useSelector(AdminSidebarSelector);
  const activeTab = useSelector(ActiveTabSelector);

  return (
    <>
      <div
        className={`w-full z-2 bg-white rounded-20 sticky top-0 select-none transition-all duration-300 ${
          AdminSideBarVar ? " max-w-[250px] " : "max-w-[80px] "
        }`}
        // h-[calc(100%_-_16px)]
      >
        <div className="">
          <span
            onClick={() => {
              if (AdminSideBarVar) dispatch(hideAdminSidebar());
              else dispatch(showAdminSidebar());
            }}
            className="sidebar__trigger w-6 h-6 p-[7px] rounded-full absolute -right-3 top-9 bg-primaryRed hover:bg-primaryRed/70 cursor-pointer inline-flex items-center justify-center active:scale-110 transition-all duration-300"
          >
            <SidebarTriggerArrow
              className={`w-full h-full transition-all duration-300 ${
                AdminSideBarVar ? "" : "rotate-180"
              }`}
            />
          </span>
          <Link
            to={"/"}
            className={`logo-wrapper block p-4 ${
              AdminSideBarVar ? "mb-9 " : "mb-4"
            }`}
          >
            <img
              src={`/assets/images/${
                AdminSideBarVar ? "riseglow-removebg-preview.png" : "favicon.ico"
              }`}
              width={127.85}
              height={45.87}
              alt="sidebarLogo"
            />
          </Link>
          {/*  overflow-auto */}
          <div
            className={`menu-list overflow-auto noscroll ${
              AdminSideBarVar
                ? " max-h-[calc(100dvh_-_165px)]"
                : " max-h-[calc(100dvh_-_125px)]"
            }`}
          >
            <ul className="px-10px grid gap-5 pb-4">
              {MenuList.map((e) => (
                <>
                  <li
                    className={`group ${
                      AdminSideBarVar ? "max-w-[200px]" : "text-center"
                    }`}
                    key={e?.name}
                  >
                    <Link
                      to={e.link}
                      onClick={() => {
                        if (toggle !== e.name && e.subMenu) setToggle(e.name);
                        else setToggle(null);
                        dispatch(setActiveTab(e.name));
                      }}
                      className={` relative px-3 cursor-pointer
                      ${
                        AdminSideBarVar
                          ? " py-2 items-center flex"
                          : " inline-flex py-3 justify-center rounded-md group-sidebar group/sidebar hover:bg-primaryRed hover:text-white transition-all duration-300"
                      }
                      ${
                        !AdminSideBarVar && activeTab == e.name
                          ? " bg-primaryRed/10 "
                          : ""
                      }
                      ${
                        !AdminSideBarVar && activeTab != e.name
                          ? " bg-black/5 hover:text-black"
                          : ""
                      }
                      `}
                    >
                      {e.icon && (
                        <span
                          className={`icon block
                          ${
                            activeTab == e.name ||
                            (e.subMenu &&
                              e.subMenuList
                                ?.map((sub) => sub.id)
                                .includes(activeTab))
                              ? " text-primaryRed group-hover/sidebar:!text-white"
                              : " text-grayDark group-hover/sidebar:!text-white"
                          }
                          ${AdminSideBarVar ? " mr-2 " : "  "}
                          `}
                        >
                          {<e.icon />}
                        </span>
                      )}
                      {AdminSideBarVar ? (
                        <>
                          <span
                            className={`text-lg/26px font-bold ${
                              activeTab == e.name ||
                              (e.subMenu &&
                                e.subMenuList
                                  ?.map((sub) => sub.id)
                                  .includes(activeTab))
                                ? " text-primaryRed "
                                : " text-grayDark "
                            }`}
                          >
                            {e.name}
                          </span>
                          {e.subMenu && (
                            <span
                              className={`down-icon flex ml-auto text-grayDark w-6 h-6 justify-center rounded items-center hover:bg-grayDark/10`}
                              onClick={() => {
                                if (toggle !== e.name && e.subMenu)
                                  setToggle(e.name);
                                else setToggle(null);
                                dispatch(setActiveTab(e.name));
                              }}
                            >
                              <ArrowDownIcon
                                className={`${
                                  toggle === e.name ? "" : "-rotate-90"
                                }`}
                              />
                            </span>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </Link>
                    {e.subMenu ? (
                      <div
                        className={`
                      ${
                        AdminSideBarVar
                          ? ""
                          : "absolute top-auto left-[calc(100%_+_15px)] w-[220px] text-left bg-white rounded-lg shadow-lg z-3 px-2.5 py-2 -translate-x-2 -translate-y-10 group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 before:absolute before:-left-8 before:top-0 before:w-10 before:h-10 transition-all duration-300"
                      }
                      ${
                        toggle === e.name ? `` : AdminSideBarVar ? `hidden` : ""
                      }

                      `}
                      >
                        <ul className={` ${AdminSideBarVar ? "pl-10" : ""} `}>
                          {e.subMenuList &&
                            e?.subMenuList?.map((el) => (
                              <li className="" key={el?.id}>
                                <Link
                                  className={`block py-2 font-semibold transition-all duration-300
                                  ${
                                    activeTab == el.id
                                      ? "text-primaryRed"
                                      : "text-grayDark hover:text-black"
                                  }
                                  ${
                                    AdminSideBarVar
                                      ? ""
                                      : "hover:bg-primaryRed hover:text-white rounded-lg px-2"
                                  }
                                  `}
                                  to={el.link}
                                  onClick={() => {
                                    dispatch(setActiveTab(el.id));
                                  }}
                                >
                                  {el.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminSideBar;
