import TopNavbar from "../components/Landing/components/Nav/TopNavbar";
import { SignUp } from "../components/SignIn_Up/SignUp";
import styled from "styled-components";

export const SignUpPage = () => {
    return (
        <Wrapper>
            <TopNavbar />
            <SignUp />
        </Wrapper>
    )
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;