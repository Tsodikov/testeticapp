import TopNavbar from "../components/Landing/components/Nav/TopNavbar";
import { SignIn } from "../components/SignIn_Up/SignIn";
import styled from "styled-components";

export const SignInPage = () => {
    return (
        <Wrapper>
            <TopNavbar showHeader={false}/>
            <SignIn />
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