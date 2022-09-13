import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addAnswers, setEditAnswerMode, setEditingAnswer, updateAnswer } from "../../store/answersSlice";

export const AddAnswer = () => {

    const editingAnswer = useSelector(state => state.answers.editingAnswer);
    const editAnswerMode = useSelector(state => state.answers.editAnswerMode);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);

    const dispatch = useDispatch();

    const onAddAnswer = (e) => {
        e.preventDefault();
        const addingAnswer = {
            textAnswer: editingAnswer.textAnswer,
            answerRight: editingAnswer.answerRight,
            questionId: activeQuestion.id,
        };
        dispatch(addAnswers(JSON.stringify(addingAnswer)));
        // dispatch(updateTest({ ...activeTest, qtnOfAnswer: activeTest.qtnOfAnswer + 1 }));
        dispatch(setEditingAnswer({...editingAnswer, textAnswer: ''}));
        cancelEditingAnswer();
    };

    const saveEditingAnswer = () => {
        const editedAnswer = {
            id: editingAnswer.id,
            textAnswer: editingAnswer.textAnswer,
            answerRight: editingAnswer.answerRight,
            questionId: activeQuestion.id,
        }
        // const questJson = JSON.stringify(editedAnswer);
        dispatch(updateAnswer(editedAnswer));
        cancelEditingAnswer();
    }

    const cancelEditingAnswer = () => {
        dispatch(setEditingAnswer({...editingAnswer, textAnswer: '', answerRight: false}));
        dispatch(setEditAnswerMode(false));
    }

    if (!activeQuestion.id) {
        return null;
    }
    return (
        <InputGroup size="lg" className="mb-3">
                <InputGroup.Checkbox 
                    aria-label="Checkbox for following text input"
                    checked={editingAnswer.answerRight}
                    onChange={() => dispatch(setEditingAnswer({...editingAnswer, answerRight: !editingAnswer.answerRight}))} />
                <Form.Control
                    // size="lg"
                    type="text"
                    placeholder="Add answer"
                    value={editingAnswer.textAnswer}
                    onChange={(e) => dispatch(setEditingAnswer({...editingAnswer, textAnswer: e.target.value}))} />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editAnswerMode?  "none" : "block"}}
                    onClick={(e) => onAddAnswer(e)}>
                    Add 
                </Button>
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editAnswerMode?  "block" : "none"}}
                    onClick={saveEditingAnswer}>
                    Save
                </Button>
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editAnswerMode?  "block" : "none"}}
                    onClick={cancelEditingAnswer}>
                    Cancel
                </Button>
            </InputGroup>
    )
}