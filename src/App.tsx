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
import { setUserData } from "./Utils/setUserData";
import { useDispatch } from "react-redux";
const App: React.FC = () => {
  console.log(localStorage.getItem("accessToken"));
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(dispatch);
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
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/companies-list" element={<CompaniesList />} />
            <Route path="/company-profile/:id" element={<CompanyProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
