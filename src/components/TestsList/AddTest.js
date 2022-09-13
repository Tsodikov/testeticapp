import { useEffect } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setEditingTest, addTest, updateTest } from "../../store/testsSlice.js";
import { decrementQtnTestsCounter, updateChapter } from "../../store/chapterSlice.js";
import { getUserInfo } from "../../store/usersSlice.js";

export function AddTest({show, editmode, ...props }) {
    const dispatch = useDispatch();
    const editingTest = useSelector(state => state.tests.editingTest);
    const activeChapter = useSelector(state => state.chapters.activeChapter);
    const currentUser = useSelector(state => state.users.currentUser);

    const handleSubmitTest = async (e) => {
        e.preventDefault();
        const newTest = {
            title: editingTest.title,
            description: editingTest.description,
            chapter: {
                id: activeChapter.id,
                chapterTitle: activeChapter.chapterTitle,
            },
            testCreator: {
                id: currentUser.id,
                creatorName: currentUser.name
            },
            dateOfCreate: editingTest.dateOfCreate,
            qtnOfQuestion: 0,
            qtnUsers: 0,
            readyToUse: editingTest.readyToUse,
            questions: []
        }
        if (!editmode) {
            dispatch(addTest(newTest));
            dispatch(updateChapter({ ...activeChapter, qtnTests: activeChapter.qtnTests + 1 }));
        } else {
            dispatch(updateTest(editingTest));
        }

        dispatch(setEditingTest({ ...editingTest, title: '', description: '', date: '', readyToUse: false }));
        props.onHide();
    };

    useEffect(() => {
        dispatch(getUserInfo(currentUser.jwt));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log(show);
    return (
        <Modal {...props}
            show={show}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
            className='new-base-font'>
            <Modal.Header>
                <Modal.Title>
                    {editmode ? `Edit test to chapter ${activeChapter.chapterTitle}` :
                        `Adding new test to chapter ${activeChapter.chapterTitle}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Form
                        onSubmit={(e) => handleSubmitTest(e)}>
                        <Form.Group className="mb-3" controlId="titleTest">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Test's title"
                                className="mb-3">
                                <Form.Control
                                    size="lg"
                                    type="text"
                                    placeholder="Enter title of test"
                                    value={editingTest.title}
                                    onChange={(e) => dispatch(setEditingTest({ ...editingTest, title: e.target.value }))} />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Description" >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Test's description"
                                className="mb-3">
                                    <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter Description"
                                    value={editingTest.description}
                                    // onChange={(e) => editingTest.description = e.target.value } />
                                    onChange={(e) => dispatch(setEditingTest({ ...editingTest, description: e.target.value }))} />
                            </FloatingLabel>
                        </Form.Group>
                        <Stack direction="horizontal" gap={5}>
                            <Form.Group className="mb-3" controlId="creatorName">
                                <Stack direction="horizontal" gap={2}>
                                    <Form.Label column sm={5}>Date of creation</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={editingTest.dateOfCreate}
                                        placeholder="Date of creation"
                                        onChange={(e) => dispatch(setEditingTest({ ...editingTest, dateOfCreate: e.target.value }))} />
                                </Stack>
                            </Form.Group>
                            <Form.Group className="ms-auto" controlId="creatorName">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Ready to use"
                                    checked={editingTest.readyToUse}
                                    onChange={(e) => 
                                        dispatch(setEditingTest({ ...editingTest, readyToUse: e.target.value === 'on'? true : false }))} />
                            </Form.Group>
                        </Stack>
                        <Stack className="d-flex justify-content-between align-items-start" direction="horizontal" gap={2}>
                            <Button className='ms-auto' variant="outline-primary" type="button"
                                onClick={() => {
                                    props.onHide();
                                    dispatch(decrementQtnTestsCounter());
                                }}>
                                Cancel
                            </Button>
                            <Button variant="outline-primary" type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}