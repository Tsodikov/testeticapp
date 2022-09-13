import { useParams } from "react-router";
import { TestCard } from "../components/Dashboard/Exams/TestCard"
import TopNavbar from "../components/Landing/components/Nav/TopNavbar";
import styled from "styled-components";

export const TestPage = () => {
    const { testId } = useParams();
    return (
        <Wrapper>
            <TopNavbar />
            <TestCard testId={testId} />
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

// export const TestPage = () => {
//     const { testId } = useParams();
//     return (
//         <EndUserHeader content={<TestCard testId={testId} />} />
//     )
// }