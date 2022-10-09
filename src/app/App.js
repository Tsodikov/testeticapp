import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { MainAdminPage } from '../Pages/MainAdminPage.js';
import { OrganizationPage } from '../Pages/OrganizationRegisterPage.js';
import { Helmet } from 'react-helmet';
import { Landing } from '../components/Landing/screens/Landing.jsx';
import { SignUpPage } from '../Pages/SignUpPage.js';
// import { AddUsersPage } from '../Pages/AddUsersPage.js';
import { AdminPage } from '../Pages/AdminPage.js';
import { CreatorDachboardPage } from '../Pages/CreatorDachboardPage.js';
import { TestPage } from '../Pages/TestPage.js';
import { SignInPage } from '../Pages/SignInPage.js';
import { UserDashboardPage } from '../Pages/UserDashboardPage.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/usersSlice.js';
import { useEffect } from 'react';
import { setCurrentOrganization } from '../store/organizationSlice.js';


function App() {
  const dispatch = useDispatch();
  const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
  const currentUser = useSelector(state => state.users.currentUser);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(login(JSON.parse(localStorage.getItem('user'))));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usersLoadingStatus === 'loaded') {
      dispatch(setCurrentOrganization(currentUser.organization[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  
  return (
    <BrowserRouter>
      <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<SignInPage />} />
        {/* <Route path="/managetests" element={<MainAdminPage />} /> */}
        <Route path="/orgregistration" element={<OrganizationPage />} />
        {/* <Route path="/addusers" element={<AddUsersPage />} /> */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/tests" >
          <Route path=":testId" element={<TestPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage dashboardOwner="admin"/>} />
        <Route path="/user" element={<UserDashboardPage dashboardOwner="enduser"/>} />
        <Route path="/creator" element={<CreatorDachboardPage dashboardOwner="creator"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
