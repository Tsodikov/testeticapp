import { ListGroup, Stack, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { allQuestionsRemove, deleteQuestion, fetchQuestions, questionsSelector, setActiveQuestion, setEditingQuestion } from "../../store/questionsSlice";
import { setEditQuestionMode } from "../../store/questionsSlice";
import { updateTest } from "../../store/testsSlice";
import { allAnswersRemove } from "../../store/answersSlice";

export const QuestionsList = () => {

    const questionsList = useSelector(questionsSelector);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const activeTest = useSelector(state => state.tests.activeTest);
    const activeChapter = useSelector(state => state.chapters.activeChapter);

    const dispatch = useDispatch();

    const onChoiceQuest = (quest) => {
        // console.log(activeQuestion, activeAnswer)
        dispatch(setActiveQuestion(quest));
    };

    const onEditQuestion = (quest) => {
        dispatch(setEditQuestionMode(true));
        dispatch(setEditingQuestion(quest));
    }

    const onDelQuestion = (id) => {
        dispatch(deleteQuestion(id));
        dispatch(updateTest({ ...activeTest, qtnOfQuestion: activeTest.qtnOfQuestion !== 0? activeTest.qtnOfQuestion - 1 : 0}));
        dispatch(allAnswersRemove());
    }

    useEffect(() => {
        if (activeTest.id) {
            // console.log(activeChapter.id)
            dispatch(allQuestionsRemove());
            dispatch(fetchQuestions(activeTest.id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTest, deleteQuestion, activeQuestion, activeChapter.id]);

    if (!activeTest.id || questionsList.length === 0) {
        return null;
    }

    return (
        <>
        <Card >
            <Card.Header className="col-header">{`Questions to test: ${activeTest.title}`}</Card.Header>
            <ListGroup variant="flush">
                {questionsList.length === 0? null :  
                questionsList.map((quest, i) => {
                    return (
                        <ListGroup.Item
                            key={i}
                            active={activeQuestion.id === quest.id? true : false}>
                            <Stack direction="horizontal" gap={2}>
                                <div onClick={() => onChoiceQuest(quest)}>
                                    {quest.titleOfQuestion}
                                </div>
                                <div
                                    className="material-symbols-outlined check-color ms-auto"
                                    onClick={() => onEditQuestion(quest)}>
                                    edit_note
                                </div>
                                <div 
                                    style={{zIndex: '100'}}
                                    className="material-symbols-outlined del-color"
                                    onClick={() => onDelQuestion(quest.id)}>
                                    close
                                </div>
                            </Stack>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Card>
        </>
    )
}