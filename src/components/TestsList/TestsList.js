import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, ListGroup, ListGroupItem, Row, Stack } from "react-bootstrap"
import { deleteTest, fetchTests, setActiveTest, setEditingTest, testsSelector } from "../../store/testsSlice.js";
import { AddTest } from "./AddTest.js";
import { updateChapter } from "../../store/chapterSlice.js";
import { allQuestionsRemove, setActiveQuestion } from "../../store/questionsSlice.js";

export const TestsList = () => {
    const [addModalShow, setAddModalShow] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const tests = useSelector(testsSelector);
    const activeTest = useSelector(state => state.tests.activeTest);
    const activeChapter = useSelector(state => state.chapters.activeChapter);

    const onDeleteTest = (id) => {
        dispatch(deleteTest(id));
        dispatch(updateChapter({ ...activeChapter, qtnTests: activeChapter.qtnTests !== 0? activeChapter.qtnTests - 1 : 0}));
        dispatch(allQuestionsRemove());
    };

    useEffect(() => {
        if (activeChapter.id) {
            dispatch(fetchTests(activeChapter.id));
        }
        // eslint-disable-next-line
    }, [activeChapter]);
    // }, [activeChapter, testCreate, deleteTest]);

    if (!activeChapter.id) {
        return null;
    }
    return (
        <>
            <AddTest
                editmode={editMode}
                show={addModalShow}
                onHide={() => setAddModalShow(false)}/>
            <div className="mb-2 d-flex justify-content-between align-items-start">
                <h4>Tests list of chapter: {activeChapter.chapterTitle}</h4>
                <div>
                    <Button 
                        variant="outline-primary"
                        onClick={() => {
                            setAddModalShow(true);
                            setEditMode(false);
                        }}>
                        Add Test
                    </Button>{' '}
                </div>
            </div>
            <ListGroup variant="flush">
                <ListGroupItem>
                    <Row className="col-header">
                        <Stack direction="horizontal" gap={1}>
                            <Col lg={4}>Test</Col>
                            <Col lg={2}>Created</Col>
                            <Col lg={2}>Creator</Col>
                            <Col lg={1}>Users</Col>
                            <Col lg={1}>Questions</Col>
                            <Col lg={1}>Usage</Col>
                        </Stack>
                    </Row>
                </ListGroupItem>
                {tests.length === 0? null :
                tests.map((test, i) => {
                    return (
                        <ListGroup.Item
                            as="li"
                            key={i}
                            active={activeTest.id === test.id? true : false}
                            onClick={() => {
                                dispatch(setActiveTest(test));
                                dispatch(setActiveQuestion({}))}}>
                            <Row>
                                <Stack direction="horizontal" gap={1}>
                                    <Col lg={4}>{test.title}</Col>
                                    <Col lg={2}>{test.dateOfCreate}</Col>
                                    <Col lg={2}>{test.testCreator.creatorName}</Col>
                                    <Col lg={1}>{test.qtnUsers}</Col>
                                    <Col lg={1} >{test.qtnOfQuestion}</Col>
                                    <Col lg={1} > 
                                        <span className="material-symbols-outlined check-color">
                                            {test.readyToUse? 'check' : ''}
                                        </span>
                                    </Col>
                                    <span className="ms-auto">
                                        <span
                                            type="button"
                                            onClick={() => {
                                                setAddModalShow(true);
                                                setEditMode(true);
                                                dispatch(setEditingTest(test));
                                            }}
                                            className="material-symbols-outlined check-color">
                                            edit_note
                                        </span>
                                        <span 
                                            className="material-symbols-outlined del-color"
                                            onClick={() => onDeleteTest(test.id)}>
                                            close
                                        </span>
                                    </span>
                                </Stack>
                            </Row>
                        </ListGroup.Item>
                    )
                })    
            }
            </ListGroup >
        </>
    )
}