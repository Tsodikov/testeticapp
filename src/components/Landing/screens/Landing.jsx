import React, { useState } from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"

export function Landing() {
  const [showHeader, setShowHeader] = useState(true);
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


