import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import './listChapter.scss'
// import { useHttp } from '../../hooks/http.hook';
import { addChapter, setActiveChapter, updateChapter } from '../../store/chapterSlice';

export function ModalAddChapter({editModal, oldChapter, ...props}) {

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newDate, setNewDate] = useState('');
    const activeChapter = useSelector(state => state.chapters.activeChapter);
    const currentUser = useSelector(state => state.users.currentUser);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let newChapter = {
            chapterTitle: newTitle,
            chapterDescription: newDescription,
            chapterCreators: {
                email: editModal? activeChapter.chapterCreators.email : currentUser.email,
                name: editModal? activeChapter.chapterCreators.creatorName : currentUser.name,
                jwt: editModal? activeChapter.chapterCreators.jwt : currentUser.jwt,
            },
            dateOfCreate: newDate,
            qtnTests: editModal? activeChapter.qtnTests : 0,
            organizationId: currentOrganization.id,
            tests: []
        }

        if (!editModal) {
            dispatch(addChapter(newChapter));
        } else {
            dispatch(updateChapter(activeChapter))
        }
        setNewTitle('');
        setNewDescription('');
        setNewDate('');
        props.onHide();
    }

    return (
        <Modal {...props}
            size="lg"
            centered
            aria-labelledby="contained-modal-title-vcenter"
            className='new-base-font'>
            <Modal.Header closeButton>
                <Modal.Title>{editModal? 'Edit chapter' : 'Adding new chapter'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Form
                    onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="titleCahapter">
                            <Form.Label>Title Chapter</Form.Label>
                            <Form.Control
                                size="lg"
                                type="text"
                                placeholder="Enter title of Chapter"
                                value={editModal? activeChapter.chapterTitle : newTitle}
                                onChange={(e) => {
                                    editModal? dispatch(setActiveChapter({...activeChapter, chapterTitle: e.target.value}))
                                    : setNewTitle(e.target.value)
                                }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows= {3}
                                placeholder="Enter Description"
                                value={editModal? activeChapter.chapterDescription : newDescription}
                                onChange={(e) => {
                                    editModal? dispatch(setActiveChapter({...activeChapter, chapterDescription: e.target.value}))
                                    : setNewDescription(e.target.value)
                                }} />
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                            <Form.Group className="mb-3" controlId="creatorName">
                                <Form.Label>Date of creation</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={editModal? activeChapter.dateOfCreate : newDate}
                                    placeholder="Date of creation"
                                    onChange={(e) => {
                                        editModal? dispatch(setActiveChapter({...activeChapter, dateOfCreate: e.target.value}))
                                        : setNewDate(e.target.value)
                                    }} />
                            </Form.Group>
                        </Stack>
                        <Stack className="d-flex justify-content-between align-items-start" direction="horizontal" gap={2}>
                            <Button className='ms-auto' variant="outline-primary" type="button" onClick={props.onHide}>
                                Cancel
                            </Button>
                            <Button  variant="outline-primary" type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
