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

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user data from local storage on app startup
    let userData: UserState = {
      is_superuser: false,
      user_avatar: "",
      user_city: "",
      user_email: "",
      user_firstname: "",
      user_id: 0,
      user_lastname: "",
      user_links: [],
      user_phone: "",
      user_status: "",
    };
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      userData = JSON.parse(userDataStr);
    }

    if (userData) {
      // Update the Redux store with the loaded user data
      dispatch(setUser(userData));
    }

    // Subscribe to changes in the Redux store
    const unsubscribe = store.subscribe(() => {
      // Save user data to local storage whenever it changes
      localStorage.setItem("userData", JSON.stringify(store.getState().user));
    });

    return unsubscribe;
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
