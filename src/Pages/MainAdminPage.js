import { ChaptersList } from "../components/ChaptersList/ChaptersList";
import { QuestionsList } from "../components/QuestionsList/QuestionsList";
import { TestsList } from "../components/TestsList/TestsList";
import { Container, Row, Col, Stack, ThemeProvider, Spinner } from 'react-bootstrap';
import { AddQuestion } from "../components/QuestionsList/AddQuestion";
import { AnswersList } from "../components/AnswersList/AnswersList";
import { AddAnswer } from "../components/AnswersList/AddAnswer";
import { MediaList } from "../components/MediaFiles/MediaList";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrganization } from "../store/organizationSlice";

export const MainAdminPage = ({ display }) => {
    const currentUser = useSelector(state => state.users.currentUser);
    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
    const dispatch = useDispatch(); 

    // if (usersLoadingStatus === 'loading') {
    //     return <Spinner />
    // } else if (usersLoadingStatus === 'error') {
    //     console.log('Error');
    //     return;
    // } else if (usersLoadingStatus === 'loaded') {
    //     dispatch(setCurrentOrganization(currentUser.organization[0]));
    if (display !== 'none') {
        return (
            <ThemeProvider breakpoints = { [ 'xxxl' ,  'xxl' ,  'xl' ,  'lg' ,  'md' ,  'sm' ,  'xs' ,  'xxs' ] }> 
                <Container fluid>
                    <Row>
                        <Col sm={3}>
                            <ChaptersList />
                        </Col>
                        <Col sm={9}>
                            <Stack gap={3}>
                                <TestsList />
                                <Stack direction="horizontal" gap={3}>
                                    <Stack>
                                        <QuestionsList />
                                        <AddQuestion />
                                    </Stack>
                                    <Stack>
                                        <AnswersList />
                                        <AddAnswer />
                                    </Stack>
                                </Stack>
                                <MediaList />
                            </Stack>
                        </Col>
                    </Row>
                </Container>
            </ThemeProvider>
        )
    } else return null;
}