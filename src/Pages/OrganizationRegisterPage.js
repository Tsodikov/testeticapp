import TopNavbar from "../components/Landing/components/Nav/TopNavbar";
import styled from "styled-components";
import RegistrationStepper from "../components/OrganizationRegisterForm/RegistrationStepper";

export const OrganizationPage = () => {
    return (
        <Wrapper>
            <TopNavbar />
            <RegistrationStepper />
        </Wrapper>
    )
}

const Wrapper = styled.section`
  padding-top: 160px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
