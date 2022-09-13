import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMediaFile, addMediaToFileServer } from "../../store/mediaFilesSlice";
import { ShowMediaFile } from "./ShowMediaFile.js";

export const AddMedia = (props) => {

    const [files, setFiles] = useState([]);

    const dispatch = useDispatch();
    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const currentUrlFs = useSelector(state => state.mediafiles.currentUrlFs);
    const fileServerLoadingStatus = useSelector(state => state.mediafiles.fileServerLoadingStatus);

    const onAddMediaFile = (e) => {
        const file = Object.values(e.target.files).map(item => {
            return {
                blob: {
                    name: item.name,
                    size: item.size,
                    type: item.type,
                    lastModified: item.lastModified,
                    lastModifiedDate: item.lastModifiedDate.toLocaleDateString(),
                    webkitRelativePath: item.webkitRelativePath
                },
                file: item
            }
        })
        setFiles(file);
        dispatch(addMediaToFileServer(file[0].file));
    };

    const onCancel = () => {
        setFiles({
            blob: {
                name: null,
                size: null,
                type: null,
                lastModified: null,
                lastModifiedDate: null,
                webkitRelativePath: null 
            },
            file: null
        });
        props.onHide();
    };

    const handleSubmit = () => {
        const prepFile = {
            blob: {
                name: files[0].blob.name,
                size: files[0].blob.size,
                type: files[0].blob.type,
                lastModified: files[0].blob.lastModified,
                lastModifiedDate: files[0].blob.lastModifiedDate,
                webkitRelativePath: files[0].blob.webkitRelativePath
            },
            url: currentUrlFs,
            questionId: activeQuestion.id,
        }
        dispatch(addMediaFile(prepFile));
        setFiles({
            blob: {
                name: null,
                size: null,
                type: null,
                lastModified: null,
                lastModifiedDate: null,
                webkitRelativePath: null 
            },
            file: null
        });
        props.onHide();
    };

    return (
        <>
            <Modal {...props}
                size="xl"
                show={props.show}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                className='new-base-font'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add media file to question: {activeQuestion.titleOfQuestion}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form >
                        <Stack gap={4}>
                            <Form.Group controlId="formFileLg" className="mb-3">
                                <Form.Control
                                    type="file"
                                    size="lg" 
                                    onChange={(e) => onAddMediaFile(e)}/>
                                {/* <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon3">
                                    https://youtube.com
                                    </InputGroup.Text>
                                    <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                                </InputGroup>     */}
                            </Form.Group>
                        
                            {files[0] ?
                            // files.map((file, i) => {
                                <ShowMediaFile mode={'file'} file={files[0]} urlArr={[]} setFiles={setFiles} /> 
                            // })
                            : <p>Select a file to show details</p>}
                        </Stack>

                        <Stack className="d-flex justify-content-between align-items-start" direction="horizontal" gap={2}>
                            <Button
                                className='ms-auto' 
                                variant="outline-primary" 
                                type="button" 
                                onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button  
                                variant="outline-primary" 
                                type="button" 
                                disabled={fileServerLoadingStatus === 'loaded'? false : true}
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

