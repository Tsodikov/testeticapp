import { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaFiles, mediaFilesSelector } from "../../store/mediaFilesSlice";
import { AddMedia } from "./AddMedia";
import { ShowMediaFile } from "./ShowMediaFile";

export const MediaList = () => {

    const [addMediaModal, setAddMediaModal] = useState(false);
    const [setEditMode] = useState(false);
    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const mediaFilesList = useSelector(mediaFilesSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (activeQuestion.id) {
            dispatch(fetchMediaFiles(activeQuestion.id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeQuestion]);

    if (!activeQuestion.id) {
        return null;
    }

    return (
        <>
        <AddMedia 
            show={addMediaModal}
            onHide={() => setAddMediaModal(false)}
        />
        <Card >
            <Card.Header className="col-header">
                <Stack direction="horizontal">
                    {`Media files to question: ${activeQuestion.titleOfQuestion}`}
                    <Button
                        className="ms-auto"
                        variant="outline-primary"
                        onClick={() => {
                            setAddMediaModal(true);
                            setEditMode(false);
                        }}>
                        Add Media
                    </Button>{' '}
                </Stack>
            </Card.Header>
            <Card.Body >
                {mediaFilesList.length === 0? null : 
                mediaFilesList.map((item, i) => {
                    return (
                        <ShowMediaFile key={i} mode={'link'} file={item} url={item.url}  />
                    )
                })}
            </Card.Body>
        </Card>
        </>
    )
}