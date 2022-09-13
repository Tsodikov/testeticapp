import { Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useSelector } from "react-redux";
import { FileTypeSelector } from "../../MediaFiles/ShowMediaFile";

export const MediaFilesList =({ setShowMediaFiles }) => {

    const activeQuestion = useSelector(state => state.questions.activeQuestion);
    const tempMediaFilesArray = useSelector(state => state.mediafiles.tempMediaFilesArray)

    return (
        <React.Fragment>
            <Paper
                sx={{ p: 2, width: '100%', overflow: 'hidden' }}
                elevation={6}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={11} lg={11}>
                        <Typography variant="subtitle" sx={{color: "blue"}}>
                            {`Media files to question: ${activeQuestion.titleOfQuestion}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={1} lg={1}>
                        <IconButton onClick={() => setShowMediaFiles(false) }>
                            <ClearOutlinedIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                    {tempMediaFilesArray? 
                    tempMediaFilesArray.map((item, i) => 
                        <Grid key={i} item xs={12} sm={4} lg={4}>
                            <FileTypeSelector key={i} url={item.url} type={item.type} />
                        </Grid>
                    ) : null}
                </Grid>
            </Paper>
        </React.Fragment>
    )
}