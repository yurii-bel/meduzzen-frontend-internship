import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Authentication from "./Pages/Authentication";
import Registration from "./Pages/Registration";
import UsersList from "./Pages/UsersList";
import UserProfile from "./Pages/UserProfile";
import CompaniesList from "./Pages/CompaniesList";
import CompanyProfile from "./Pages/CompanyProfile";
import ErrorPage from "./Pages/ErrorPage";
import { useDispatch } from "react-redux";
import { setUser } from "./Store/userReducer";
import store from "./Store/store";
import userReducer from "./Store/userReducer";
import { UserState } from "./Types/types";
import { useSelector } from "react-redux";
import { apiInstance } from "./Api/api";

const App: React.FC = () => {
  const dispatch = useDispatch();

  console.log(localStorage.getItem("accessToken"));

  const setUserData = async () => {
    apiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    const userData = await apiInstance.get("/auth/me/");
    dispatch(setUser(userData.data.result));
  };

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <Router>
      <div>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<HomePage title="Tasks Front End 4.0" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/companies-list" element={<CompaniesList />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
