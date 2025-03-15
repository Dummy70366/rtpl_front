import { AuthRoutes, RoutesPath } from "./routes/Routes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { tokenSelector } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";

import AuthLayOut from "@/defaultLayout/authLayout";
import LayOut from "../defaultLayout";
import NotFound from "../pages/notFound/NotFound";
import { useSelector } from "react-redux";

const RouterComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = useSelector(tokenSelector);
  const [temp, setTemp] = useState(false);

  useEffect(() => {

    setTemp(!temp);
    !token &&
      !AuthRoutes.find((val) => val.path === pathname) &&
      navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        {RoutesPath.map((route, id) => (
          <Route key={id} path={route.path} element={<route.element />} />
        ))}
      </Route>
      <Route path="/" element={<AuthLayOut />}>
        {!token &&
          AuthRoutes.map((route, id) => (
            <Route key={id} path={route.path} element={<route.element />} />
          ))}
      </Route>

      <Route path="*" element={<LayOut />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RouterComponent;
