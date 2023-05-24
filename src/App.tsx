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
import UserCompaniesList from "./Pages/UserCompaniesList";
import UserInvitesList from "./Pages/UserInvitesList";
import CompanyMembersList from "./Pages/CompanyMembersList";
import UserRequestsList from "./Pages/UserRequestsList";
import CompanyRequestsList from "./Pages/CompanyRequestsList";
import CompanyInvitesList from "./Pages/CompanyInvitesList";
import UserSendRequest from "./Pages/UserSendRequest";
import CompanySendInvite from "./Pages/CompanySendInvite";
import CompanyBlockedList from "./Pages/CompanyBlockedList";
import CompanyQuizzesList from "./Pages/CompanyQuizzesList";
import CompanyQuiz from "./Pages/CompanyQuiz";
import CompanyAnalytics from "./Pages/CompanyAnalytics";
const App: React.FC = () => {
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
            <Route
              path="/company-members-list/:id"
              element={<CompanyMembersList />}
            />
            <Route
              path="/user-companies-list/:id"
              element={<UserCompaniesList />}
            />
            <Route
              path="/user-invites-list/:id"
              element={<UserInvitesList />}
            />
            <Route
              path="/user-requests-list/:id"
              element={<UserRequestsList />}
            />
            <Route
              path="/user-send-request/:id"
              element={<UserSendRequest />}
            />
            <Route
              path="/company-requests-list/:id"
              element={<CompanyRequestsList />}
            />
            <Route
              path="/company-invites-list/:id"
              element={<CompanyInvitesList />}
            />
            <Route
              path="/company-send-invite/:id"
              element={<CompanySendInvite />}
            />
            <Route
              path="/company-blocked-list/:id"
              element={<CompanyBlockedList />}
            />
            <Route
              path="/company-profile/:id/quizzes-list/"
              element={<CompanyQuizzesList />}
            />
            <Route
              path="/company-profile/:id/quizzes-list/:qid"
              element={<CompanyQuiz />}
            />
            <Route
              path="/company-analytics/:id"
              element={<CompanyAnalytics />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
