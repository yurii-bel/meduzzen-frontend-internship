import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Authentication from "./pages/Authentication";
import Registration from "./pages/Registration";
import UsersList from "./pages/UsersList";
import UserProfile from "./pages/UserProfiel";
import CompaniesList from "./pages/CompaniesList";
import CompanyProfile from "./pages/CompanyProfile";

const App: React.FC = () => {
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
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
