import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrgByChapter } from '../../../store/organizationSlice';
import { getByUserTestId } from '../../../store/testSessionSlice';
import { getTestById } from '../../../store/testsSlice';
import FinalDialog from './FinalDialog';
import { RegistrationDialog } from './RegistrationDialog';

export const TestCard = ({mode, setShowExam, setShowTestCard, setShowConfirmList, setStartExam, testId}) => {

    const items = [
        'I am a student of this course and would like to register for the exam',
        'I am a student of this university, but I am not studying this course, but I would like to pass this exam.',
        'I am not a student at your university but would like to take the exam'
    ]

    const dispatch = useDispatch();
    const activeTest = useSelector(state => state.tests.activeTest);
    const currentUser = useSelector(state => state.users.currentUser);
    const currentTestSession = useSelector(state => state.testSession.currentTestSession);

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(items[1]);
    const [registerDisabled, setRegisterDisabled] =React.useState(false);
    const [openFinalDialog, setOpenFinalDialog] = React.useState(false);
    const [startTest, setStartTest] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        currentUser.id? setOpenFinalDialog(true) : setOpenFinalDialog(false);
        setSelectedValue(value);
    };

    const enableStartTest = () => {
        if (currentTestSession) {
            if (currentTestSession.status === 'registered' && currentUser.id) {
                setStartTest(true);
            } else {
                setStartTest(false);
            }
        }
    }

    const buttonName = () => {
        if (currentTestSession) {
            switch (currentTestSession.status) {
                case 'registering':
                    return 'Wait for confirmation';
                case 'idle':
                    return 'Register';
                case 'registered':
                    // setStartTest(true);
                    return 'You are already registered'
                default:
                    return 'Register';
            }
        }
        return 'Register';
    }

    const handleCancel = () => {
        setOpen(false);
        // setContent('exam');
        setShowExam(false);
        setStartExam(false);
        // setShowTestCard(false);
        setShowConfirmList(true);
    }

    const handleStartExam = () => {
        setShowConfirmList(false);
        // setShowTestCard(false);
        setStartExam(true);
        setShowExam(true);
    }

    useEffect(() => {
        if (mode !== "preview" || mode !== "exam") {
        currentUser.id? setRegisterDisabled(false) : setRegisterDisabled(true);
        if (activeTest.id && currentUser.id) {
            dispatch(getByUserTestId({userId: currentUser.id, testId: activeTest.id}));
            setRegisterDisabled(true);
        }}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    useEffect(() => {
        if (mode !== "preview" || mode !== "exam") {
        currentTestSession? setRegisterDisabled(true) : setRegisterDisabled(false);
        enableStartTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [currentTestSession]);

    if (!activeTest.id) return null;

    return (
        <Card sx={mode === "preview"? { maxWidth: 560 } : { maxWidth: 680, margin: "auto" }}>
            <CardMedia
                component="img"
                height={mode === "preview"? "280" : "320"}
                image={activeTest.testMediaFiles.length !== 0?
                    activeTest.testMediaFiles[0].url : 
                    'https://roboticsandautomationnews.com/wp-content/uploads/2021/02/student-passing-online-exam-home-student-passing-online-exam-home-closeup-181815769.jpg'}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div">
                    {activeTest.id? activeTest.chapter.chapterTitle : null}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {activeTest.title}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {activeTest.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Number of questions: {activeTest.qtnOfQuestion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Test time: {activeTest.timeLimit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Exam period: {activeTest.currentActiveStart.slice(1, 8)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Registration status: Requirement registration
                </Typography>
            </CardContent>
            <CardActions>
            {mode === "exam"? <>
                <Button
                    size="small" 
                    onClick={handleCancel} 
                    disabled={mode === "preview" || mode !== "exam"? true : false} >
                    Cancel
                </Button>
                <Button
                    size="medium" 
                    onClick={() => handleStartExam()} 
                    variant="contained"
                    disabled={mode === "preview" || mode !== "exam"? true : false} >
                    Start exam!
                </Button> </>
                : <>   
                <Button
                    size="small" 
                    onClick={handleClickOpen} 
                    disabled={mode === "preview"? true : registerDisabled} >
                    {buttonName()}
                </Button>
                
                <RegistrationDialog
                    items={items}
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />
                <FinalDialog 
                    setOpenFinalDialog={setOpenFinalDialog}
                    openFinalDialog={openFinalDialog}
                    registerDisabled={registerDisabled}
                    setRegisterDisabled={setRegisterDisabled}/>
                <Button size="small" disabled={mode === "preview"? true : !startTest}>Start test</Button></>}
            </CardActions>
        </Card>
    )
}