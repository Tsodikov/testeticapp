import { useEffect } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { answersSelector, deleteAnswer, fetchAnswers, setEditAnswerMode, setEditingAnswer } from "../../store/answersSlice";

export const AnswersList = () => {

    const answersList = useSelector(answersSelector);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);

    const dispatch = useDispatch();

    const onEditAnswer = (quest) => {
        dispatch(setEditAnswerMode(true));
        dispatch(setEditingAnswer(quest));
    }

    const onDelAnswer = (id) => {
        dispatch(deleteAnswer(id));
        // dispatch(updateTest({ ...activeTest, qtnOfQuestion: activeTest.qtnOfQuestion !== 0? activeTest.qtnOfQuestion - 1 : 0}));
    }

    useEffect(() => {
        // console.log(activeQuestion.id)
        if (activeQuestion.id) {
            dispatch(fetchAnswers(activeQuestion.id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeQuestion]);

    if (!activeQuestion.id || answersList.lengt === 0) {
        return null;
    }
    return (
        <Card style={{ width: '39.6 rem' }}>
                <Card.Header className="col-header">{`Answers on question`}</Card.Header>
                <ListGroup variant="flush">
                    {
                        answersList.length === 0? null : 
                        answersList.map((answer, i) => {
                            return (
                                answer.id === ''? null :
                                <ListGroup.Item key={i}>
                                    <Stack direction="horizontal" gap={2}>
                                        <div className="material-symbols-outlined check-color">
                                            {answer.answerRight? 'check' : ''}
                                        </div>
                                        <div>{answer.textAnswer}</div>
                                        <div
                                            className="ms-auto"
                                            onClick={() => onEditAnswer(answer)}>
                                            <div className="material-symbols-outlined check-color">
                                            edit_note</div>
                                        </div>
                                        <div
                                            // className="ms-auto"
                                            onClick={(e) => onDelAnswer(answer.id)}>
                                            <div className="material-symbols-outlined del-color">
                                                close
                                            </div>
                                        </div>
                                    </Stack>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </Card>
    )
}