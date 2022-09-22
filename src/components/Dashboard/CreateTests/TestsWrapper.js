import { Grid } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import { AddAnswer } from "./AddAnswer"
import { AddQuestion } from "./AddQuestion"
import AddTest from "./AddTest"
import { AnswerTable } from "./AnswerTable"
import ApplicantTable from "./ApplicantTable"
import { MediaFilesList } from "./MediaFilesList"
import { QuestionTable } from "./QuestionTable"
import { StudentInfo } from "./StudentInfo"
import TestsList from "./TestsList"
import { TestStatistic } from "./TestStatistic"

export const TestsWrraper = ({display}) => {

    const switchMode = (mode) => {
        switch (mode) {
            case 'modeAddTest':
                if (!showAddTest) setShowAddTest(true);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            
            case 'modeAddQuestion':
                if (showAddTest) setShowAddTest(false);
                if (!showAddQuestion) setShowAddQuestion(true);
                if (!showQuestionTable) setShowQuestionTable(true);
                if (!showAnswerTable) setShowAnswerTable(true);
                if (showAddAnswer) setShowAddAnswer(false);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeQuestionTable':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (!showQuestionTable) setShowQuestionTable(true);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeAnswerTable':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (!showAnswerTable) setShowAnswerTable(true);
                if (showAddAnswer) setShowAddAnswer(false);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeAddAnswer':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (!showAddAnswer) setShowAddAnswer(true);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeMediaFiles':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (!showMediaFiles) setShowMediaFiles(true);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeApplicantTable':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (!showMediaFiles) setShowMediaFiles(false);
                if (!showApplicantTable) setShowApplicantTable(true);
                if (showStudentInfo) setShowStudentInfo(false);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeStudentInfo':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (!showMediaFiles) setShowMediaFiles(false);
                if (!showApplicantTable) setShowApplicantTable(true);
                if (!showStudentInfo) setShowStudentInfo(true);
                if (showTestStatistic) setShowTestStatistic(false);
                break;
            case 'modeTestStatistic':
                if (showAddTest) setShowAddTest(false);
                if (showAddQuestion) setShowAddQuestion(false);
                if (showQuestionTable) setShowQuestionTable(false);
                if (showAnswerTable) setShowAnswerTable(false);
                if (showAddAnswer) setShowAddAnswer(false);
                if (showMediaFiles) setShowMediaFiles(false);
                if (showApplicantTable) setShowApplicantTable(false);
                if (showStudentInfo) setShowStudentInfo(false);
                if (!showTestStatistic) setShowTestStatistic(true);
                break;
            default:
                break;
        }
    }

    const [selectedTest, setSelectedTest] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [showAddTest, setShowAddTest] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({id: null});
    const [showStudentInfo, setShowStudentInfo] = React.useState(false);
    const [showAddQuestion, setShowAddQuestion] = React.useState(false);
    const [showQuestionTable, setShowQuestionTable] = React.useState(false);
    const [showAnswerTable, setShowAnswerTable] = React.useState(false);
    const [showAddAnswer, setShowAddAnswer] = React.useState(false);
    const [showMediaFiles, setShowMediaFiles] = React.useState(false);
    const [showApplicantTable, setShowApplicantTable] = React.useState(false);
    const [showTestStatistic, setShowTestStatistic] = React.useState(false);

    if (display === 'none') return null;
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Grid container spacing={2} display={display}>
                    <Grid item xs={12} md={12} lg={12}>
                        <TestsList
                            switchMode={switchMode}
                            selectedTest={selectedTest}
                            setSelectedTest={setSelectedTest}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            setShowAddTest={setShowAddTest}
                        />
                    </Grid>
                    {!showAddTest? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <AddTest
                            editMode={editMode}
                            setEditMode={setEditMode}
                            showAddSection={showAddTest}
                            setShowAddTest={() => setShowAddTest()} />
                    </Grid>}

                    {!showApplicantTable? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <ApplicantTable 
                            selectedTest={selectedTest}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            switchMode={switchMode}/>
                    </Grid>}

                    {!showStudentInfo? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <StudentInfo 
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            setShowStudentInfo={setShowStudentInfo}/>
                    </Grid>}

                    {!showAddQuestion? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <AddQuestion
                            editMode={editMode}
                            setEditMode={setEditMode}
                            switchMode={switchMode}
                            setShowAddQuestion={setShowAddQuestion}
                        />
                    </Grid>}

                    {!showAddAnswer? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <AddAnswer
                            editMode={editMode}
                            setEditMode={setEditMode}
                            setShowAddAnswer={setShowAddAnswer}
                        />
                    </Grid>}

                    {!showMediaFiles? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <MediaFilesList
                            setShowMediaFiles={setShowMediaFiles}
                        />
                    </Grid>}

                    {!showTestStatistic? null : 
                    <Grid item xs={12} md={12} lg={12}>
                        <TestStatistic
                            setShowTestStatistic={setShowTestStatistic}
                        />
                    </Grid>}

                    </Grid>
                    <Grid container spacing={2} >
                    <Grid item xs={12} md={12} lg={12}></Grid>
                        {!showQuestionTable? null :
                        <Grid item xs={12} md={6} lg={6}>
                            <QuestionTable 
                                setEditMode={setEditMode} editMode={editMode}
                                switchMode={switchMode}
                                showAddQuestion={showAddQuestion}
                                setShowQuestionTable={setShowQuestionTable}
                                setShowAnswerTable={setShowAnswerTable} showAnswerTable={showAnswerTable}
                                />
                        </Grid>}
                    
                        {!showAnswerTable? null :
                        <Grid item xs={12} md={6} lg={6}>
                            <AnswerTable 
                                setEditMode={setEditMode} editMode={editMode}
                                switchMode={switchMode}
                                setShowAnswerTable={setShowAnswerTable}
                                setShowQuestionTable={setShowQuestionTable}
                                />
                        </Grid>}
                    </Grid>
            </Container>
        </React.Fragment>
    )
}