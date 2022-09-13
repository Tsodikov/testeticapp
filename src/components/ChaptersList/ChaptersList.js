/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Button, ListGroup, ListGroupItem, Spinner, Stack } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './listChapter.scss';
import { useCallback, useEffect, useState } from "react";
import { ModalAddChapter } from './ModalAddChapter.js';
import { useDispatch, useSelector } from "react-redux";
import { chapterRemove, chaptersSelector, fetchChapters, setActiveChapter } from '../../store/chapterSlice.js'
import { HttpError } from "../messages/HttpError";
import { useHttp } from "../../hooks/http.hook";
import { setActiveTest } from "../../store/testsSlice";
import { setActiveQuestion } from "../../store/questionsSlice";

export const ChaptersList = () => {
    const [modalShow, setModalShow] = useState(false);
    const [editModal, setEditModal] = useState(true);

    const dispatch = useDispatch();
    const { request } = useHttp();
    
    const chaptersList = useSelector(chaptersSelector);
    const chaptersListLoadingStatus = useSelector(state => state.chapters.chaptersLoadingStatus);
    const activeChapter = useSelector(state => state.chapters.activeChapter);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    
    useEffect(() => {
        dispatch(fetchChapters(currentOrganization.id));
    }, []);

    const onDeleteChapter = useCallback((id) => {
        request(`http://localhost:8000/chapters/del/${id}`, 'DELETE')
            .then(dispatch(chapterRemove(id)))
            .catch(err => console.log(err));
    }, [request]);

    if (chaptersListLoadingStatus === 'loading') {
        return <Spinner animation="border" />;
    } else {
        if (chaptersListLoadingStatus === 'error') {
            return <HttpError />
        }
    };

    const onChoiceChapter = (chapter) => {
        dispatch(setActiveChapter(chapter));
        dispatch(setActiveTest({}));
        dispatch(setActiveQuestion({}));
        // dispatch(setActiveTest({...activeTest, id: 0}));
    }

    const currentChapter = chaptersList.filter(item => item.id === activeChapter.id)[0];

    return (
        <>
            <div className="mb-2 d-flex justify-content-between align-items-start">
                <h4>Test's Chapters</h4>
                <div>
                    <Button
                        variant="outline-primary"
                        disabled={activeChapter.id? false : true}
                        onClick={() => {
                            setModalShow(true);
                            setEditModal(true);
                        }}>
                        Edit Chapter
                    </Button>{' '}
                    <Button 
                        variant="outline-primary" 
                        onClick={() => {
                            setModalShow(true);
                            setEditModal(false);
                        }}>
                        Add
                    </Button>{' '}
                    <ModalAddChapter
                        oldChapter={currentChapter? currentChapter : {}}
                        editModal={editModal}
                        show={modalShow}
                        onHide={() => setModalShow(false)} />
                </div>
            </div>
            <ListGroup as="ul" className="bg-transparent">
                {chaptersList.length === 0? null : 
                chaptersList.map((chapter, i) => {
                    return (
                        <ListGroupItem
                            as="li"
                            active={activeChapter.id === chapter.id? true : false}
                            key={i}
                            onClick={() => onChoiceChapter(chapter) }
                            className="mb-2 d-flex justify-content-between align-items-start new-list-item">
                            <Stack gap={1}>
                                <Stack direction="horizontal" gap={1}>
                                    <h5 >{chapter.chapterTitle}</h5>
                                    <Badge className="ms-auto" bg="secondary new-badge-color" pill>
                                        {chapter.qtnTests === 0? null : chapter.qtnTests }</Badge>
                                    <span
                                        className={chapter.qtnTests === 0? "ms-auto" : null}
                                        onClick={() => onDeleteChapter(chapter.id)}>
                                        <span className="material-symbols-outlined del-color">
                                            close
                                        </span>
                                    </span>
                                </Stack>
                                <span >{`by ${chapter.chapterCreators.name}`}</span>
                                <span 
                                    style={{fontSize: "12px", 
                                            fontStyle: "italic"}}>
                                    {chapter.chapterDescription}
                                </span>
                            </Stack>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </>
    )
}