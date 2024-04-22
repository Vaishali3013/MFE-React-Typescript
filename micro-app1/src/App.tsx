import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeContext } from "components/Context/ThemeContext";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import { SetNewPassword } from "pages/Login/SetNewPassword";
import { UpdatePassword } from "pages/Login/UpdatePassword";
import { ForgetPassword } from "pages/Login/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { EMPTY } from "types/enums";
import PageLayout from "pages/pageLayout";
import SideNavRoutes from "./routes/index";
import { message } from "antd";
import { data } from "json/sideNav";
import { parseJwt } from "utils/jwtTokenFunction";
import {
  getLoggedInUserDetails,
  getLoggedInUserScreenPermissinonList,
} from "redux/actions/UserManagementActions/usersAction";
import { extractResourcePermissions } from "utils/rbacFunction";
import { LinkExpired } from "pages/Login/LinkExpired";
import { VerifyOtp } from "pages/Login/MFA";
import Cookies from "universal-cookie";

const cookies = new Cookies();

message.config({
  duration: 3,
  maxCount: 1,
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isBrowserDefaulDark = (): any =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
    return localStorageTheme ?? browserDefault;
  };
  const location = useLocation();
  const allowedTabList = useSelector(
    (state: any) => state?.root?.allowedMenuList
  );

  const [theme, setTheme] = useState(getDefaultTheme());
  const isLoggedIn = useSelector(
    (state: any) =>
      Boolean(localStorage.getItem("authToken")) ||
      Boolean(sessionStorage.getItem("authToken")) ||
      Boolean(cookies.get("authToken"))
  );
  const [forgotEmail, setForgotEmail] = useState(EMPTY.string);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("authToken")) ||
      Boolean(sessionStorage.getItem("authToken")) ||
      Boolean(cookies.get("authToken"))
  );

  const loggedInUserDetails = useSelector(
    (state: any) => state.userManagement.users?.loggedInUserDetails
  );

  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  const user = parseJwt();
  useEffect(() => {
    if (user) {
      dispatch(getLoggedInUserDetails(user.UserId));
    }
  }, []);

  useEffect(() => {
    if (user) {
      document.cookie = `uid=${user.UserId}; domain=solulever.com; path=/`;
      document.cookie = `isAdmin=${!(
        allowedTabList.length > 0
      )}; domain=solulever.com; path=/`;
      localStorage.setItem("isAdmin", loggedInUserDetails.admin);
    }
  }, [user, loggedInUserDetails, allowedTabList]);

  // NOTE- Commenting for future reference
  // useEffect(() => {
  //     if (!isAuthenticated) navigate('/login');
  // }, [isLoggedIn]);

  const findIdsByPathName = (data: any, pathName: any): any => {
    const recursiveSearch = (items: any): any => {
      for (const item of items) {
        if (item.path === pathName) {
          return item.id;
        }
        if (item.children) {
          const foundIds = recursiveSearch(item.children);
          if (foundIds !== null) {
            return foundIds;
          }
        }
      }
      return null;
    };
    return recursiveSearch(data);
  };
  useEffect(() => {
    if (loggedInUserDetails.userId && !loggedInUserDetails.admin) {
      if (location.pathname?.includes("/account-settings/")) {
        return undefined;
      } else if (
        !allowedTabList?.includes(findIdsByPathName(data, location.pathname))
      ) {
        isAuthenticated ? navigate("/home") : navigate("/login");
      }
    }
  }, [isAuthenticated, loggedInUserDetails]);
  useEffect(() => {
    if (loggedInUserDetails?.roles)
      dispatch(
        getLoggedInUserScreenPermissinonList(
          extractResourcePermissions(loggedInUserDetails?.roles)
        )
      );
  }, [loggedInUserDetails]);

  return !isAuthenticated ? (
    <Routes>
      <Route path={"/login"} element={<Login />} />
      <Route
        path={"/setnew-password"}
        element={<SetNewPassword emailvalue={forgotEmail} />}
      />
      <Route path={"/update-password"} element={<UpdatePassword />} />
      <Route
        path={"/forgot-password"}
        element={<ForgetPassword setForgotEmail={setForgotEmail} />}
      />
      <Route path={"/verify-otp"} element={<VerifyOtp />} />
      <Route path={"/link-expired"} element={<LinkExpired />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  ) : (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/*" element={<SideNavRoutes />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
