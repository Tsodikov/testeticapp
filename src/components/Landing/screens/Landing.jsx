import React, { useEffect, useState } from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function Landing() {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.users.currentUser);

  // useEffect(() => {
  //   if (usersLoadingStatus) {
  //     dispatch(setCurrentOrganization(currentUser.organization[0]));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [usersLoadingStatus]);

  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // dispatch(setCurrentOrganization(currentUser.organization[0]));
      switch (currentUser.role) {
        case 'CREATOR': 
          // setSuccess(true);
          navigate('/creator');
          break;
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'END_USER':
          // setSuccess(true);
          navigate('/user');
          break;
        default:
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <TopNavbar showHeader={showHeader} setShowHeader={setShowHeader}/>
      <Header showHeader={showHeader} setShowHeader={setShowHeader}/>
      {showHeader? <>
        <Services />
        <Projects />
        <Blog />
        <Pricing />
        <Contact />
        <Footer />
      </> : null}
    </>
  );
}


