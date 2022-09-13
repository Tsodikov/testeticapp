import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addQuestions, updateQuestion, setEditingQuestion, setEditQuestionMode } from "../../store/questionsSlice";
import { testsSelector, updateTest } from "../../store/testsSlice";

export const AddQuestion = ({ editMode, ...props }) => {

    const dispatch = useDispatch(); 

    const editingQuestion = useSelector(state => state.questions.editingQuestion);
    const editQuestionMode = useSelector(state => state.questions.editQuestionMode);
    const activeTest = useSelector(state => state.tests.activeTest);
    const testsList = useSelector(testsSelector);
    
    const onAddQuestion = (e) => {
        e.preventDefault();
        const addingQuestion = {
            titleOfQuestion: editingQuestion.titleOfQuestion,
            testId: activeTest.id,
        };
        dispatch(addQuestions(JSON.stringify(addingQuestion)));
        dispatch(updateTest({ ...activeTest, qtnOfQuestion: activeTest.qtnOfQuestion + 1 }));
        dispatch(setEditingQuestion({...editingQuestion, titleOfQuestion: ''}));
    };

    const saveEditingQuestion = () => {
        const editedQuestion = {
            id: editingQuestion.id,
            titleOfQuestion: editingQuestion.titleOfQuestion,
            testId: activeTest.id,
            wieght: 1,
        }
        // const questJson = JSON.stringify(editedQuestion);
        dispatch(updateQuestion(editedQuestion));
        cancelEditingQuestion();
    }

    const cancelEditingQuestion = () => {
        dispatch(setEditingQuestion({...editingQuestion, titleOfQuestion: ''}));
        dispatch(setEditQuestionMode(false));
    }

    // console.log(editQuestionMode)

    if (!activeTest.id || testsList.length === 0) {
        return null;
    }
    return (
        <Stack>
            <InputGroup size="lg" className="mb-3">
                <Form.Control
                    // size="lg"
                    type="text"
                    placeholder="Add question"
                    value={editingQuestion.titleOfQuestion}
                    onChange={(e) => dispatch(setEditingQuestion({ ...editingQuestion, titleOfQuestion: e.target.value }))} />
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editQuestionMode?  "none" : "block"}}
                    onClick={onAddQuestion}>
                    Add
                </Button>
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editQuestionMode?  "block" : "none"}}
                    onClick={saveEditingQuestion}>
                    Save
                </Button>
                <Button 
                    variant="outline-secondary" 
                    id="button-addon2"
                    style={{display: editQuestionMode?  "block" : "none"}}
                    onClick={cancelEditingQuestion}>
                    Cancel
                </Button>
            </InputGroup>
        </Stack>
    )
}