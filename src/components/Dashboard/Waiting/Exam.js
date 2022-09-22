/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchQuestions, questionsSelector } from '../../../store/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, ImageList, ImageListItem, Radio, RadioGroup, useRadioGroup } from '@mui/material';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { TestCard } from '../Exams/TestCard';
import { updateTestSession } from '../../../store/testSessionSlice';
import { createQuestionSession } from '../../../store/questionSessionSlice';
import ExamFinishCard from './ExamFinichCard';
import { updateTest } from '../../../store/testsSlice';

export const Exam = ({ setShowTestCard, setShowConfirmList, setShowExam }) => {

    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [startExam, setStartExam] = useState(false);
    const [finishExam, setFinishExam] = useState(false);
    const [valueAnswer, setValueAnswer] = useState(null);
    const [checkedAnswer, setCheckedAnswer] = useState({});
    const [startQuestionTime, setStartQuestionTime] = useState('');
    const [choiceAnswerArr, setChoiceAnswerArr] = useState([]);
    const activeTest = useSelector(state => state.tests.activeTest);
    const currentTestSession = useSelector(state => state.testSession.currentTestSession);
    const questionsList = useSelector(questionsSelector);

    const totalSteps = () => {
        return questionsList.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
        isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            questionsList.findIndex((question, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleStep = (step) => () => {
    //     setActiveStep(step);
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
        ({ theme, checked }) => ({
          '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
          },
        }),
      );
      
    function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();
    
    let checked = false;
    
    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }
    return <StyledFormControlLabel checked={checked} {...props} />;
    }
    
    MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
    };

    const getResult = (choiceArr) => {
        const rightAnswers = questionsList[activeStep].answers.filter(item => item.answerRight);
        const result = [];
        choiceArr.forEach(id => {
            if (rightAnswers.filter(item => item.id === id).length === 0) {
                result.push(false)
            } else {
                result.push(true);
            };
        });
        if (result.filter(item => item === false).length === 0) return true;
        else return false; 
    }

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        if (completedSteps() === totalSteps()) {
            setStartExam(false);
            setFinishExam(true);
        }
        let b;
        if (questionsList[activeStep].oneAnswer) {
            setChoiceAnswerArr(choiceAnswerArr.push(Number(valueAnswer)));
        } else {
            let a = [];
            let arrChoice = Object.keys(Object.fromEntries(Object.entries(checkedAnswer).filter(item => item[1] === true)))
            arrChoice.forEach(id => {
                a.push(questionsList[activeStep].answers.filter(item => item.id === Number(id)))
            })
            b = a.map(item => item[0].id);
        }
        dispatch(createQuestionSession({
            startQuestion: startQuestionTime,
            endQuestion: new Date(),
            result: getResult(questionsList[activeStep].oneAnswer? choiceAnswerArr : b),
            choiceAnswerId: questionsList[activeStep].oneAnswer? choiceAnswerArr : b,
            testSessionId: currentTestSession.id,
            questionId: questionsList[activeStep].id,
        }));
        setChoiceAnswerArr([]);
        setStartQuestionTime(new Date());
        setValueAnswer(null);
        handleNext();
    };

    const handleSetRadioGroup = (e) => {
        setValueAnswer(e.target.value);
        
    }

    const handleSetCheckBox = (e, item) => {
        setCheckedAnswer({
            ...checkedAnswer,
            [e.target.value]: e.target.checked,
        });
    }
      
    useEffect(() => {
        dispatch(fetchQuestions(activeTest.id));      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (startExam) {
            dispatch(updateTestSession({
                id: currentTestSession.id, 
                testSession: {
                    ...currentTestSession, 
                    startTest: new Date(),
                    status: 'Started exam'
                }
            }));
            setStartQuestionTime(new Date());
        }
        if (!startExam && finishExam) {
            dispatch(updateTestSession({
                id: currentTestSession.id, 
                testSession: {
                    ...currentTestSession, 
                    endTest: new Date(),
                    // qtnUsers: currentTestSession.qtnUsers + 1,
                    status: 'Exam finished'
                }
            }));
            dispatch(updateTest({
                newTest: {
                    ...activeTest,
                    qtnUsers: activeTest.qtnUsers + 1,
                },
                testId: activeTest.id,
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startExam]);

    return (
    <Fragment>
        {!startExam && !finishExam ? <TestCard 
            mode="exam" 
            setStartExam={setStartExam} 
            setShowTestCard={setShowTestCard}
            setShowConfirmList={setShowConfirmList}
            setShowExam={setShowExam}/> : 
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{marginBottom: "20px"}}>
                {activeTest.title}
            </Typography>
            <Stepper nonLinear={activeTest.backToAnyQuestion? true : false} activeStep={activeStep}>
                {questionsList.map((item, index) => (
                <Step key={item.id} completed={completed[index]}>
                    <StepButton color="inherit" />
                </Step>
                ))}
            </Stepper>
        {/* <div> */}
            {allStepsCompleted() ?  (
                <ExamFinishCard 
                    setShowConfirmList={setShowConfirmList}
                    setShowExam={setShowExam}/>
            ) : (
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography sx={{ mt: 2, mb: 1, py: 1, fontSize: "1.6rem" }} variant="subtitle1">
                            {`Question ${activeStep + 1}. ${questionsList[activeStep].titleOfQuestion}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <Typography sx={{ mt: 2, mb: 1, py: 1, fontSize: "1.4rem" }} variant="subtitle2">
                            {questionsList[activeStep].explanationText}
                        </Typography>
                    </Grid>
                    {questionsList[activeStep].mediaFile.length === 0 ? null :
                        <Grid item xs={12} sm={6} lg={6}>
                            <ImageList variant="masonry" cols={1} rowHeight="auto">
                                {questionsList[activeStep].mediaFile.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                    src={`${item.url}`}
                                    srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.filename}
                                    loading="lazy"
                                    />
                                </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>}
                    <Grid item xs={12} sm={6} lg={6}>
                        {questionsList[activeStep].oneAnswer? (
                        <FormControl >
                            <RadioGroup 
                                value={valueAnswer}
                                onChange={(e) => handleSetRadioGroup(e)}
                                name="use-radio-group">
                                {questionsList[activeStep].answers.map((item, i) => (
                                    <FormControlLabel 
                                        key={item.id}
                                        value={item.id} 
                                        name={item.textAnswer} 
                                        label={item.textAnswer} 
                                        control={<Radio />} />
                                ))}
                            </RadioGroup>
                        </FormControl>) : 
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                                {questionsList[activeStep].answers.map((item, i) => (
                                    <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox 
                                            onChange={(e) => handleSetCheckBox(e, item)} 
                                            checked={checkedAnswer.value} 
                                            value={item.id}
                                            name={item.textAnswer} />
                                    }
                                    label={item.textAnswer}/>
                                ))} 
                            </FormGroup>
                        </FormControl>}
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {!activeTest.backToAnyQuestion? null :
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>}
                <Box sx={{ flex: '1 1 auto' }} />
                {!activeTest.backToAnyQuestion? null :
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                </Button>}
                {activeStep !== questionsList.length &&
                    (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                        Step {activeStep + 1} already completed
                    </Typography>
                    ) : (
                    <Button 
                        onClick={handleComplete}
                        disabled={!valueAnswer? true : false}>
                        {completedSteps() === totalSteps() - 1
                        ? 'Finish'
                        : 'Complete question'}
                    </Button>
                    ))}
                </Box>
            </Fragment>
            )}
        {/* </div> */}
        </Box>
    }   
    </Fragment>
    );
}
