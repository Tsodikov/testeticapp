import * as React from 'react';
import { Avatar, Grid, IconButton, Paper, Typography } from "@mui/material"
import { ChartResultExam } from '../Waiting/ChartResultExam';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQSbYTsId } from '../../../store/questionSessionSlice';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

export const StudentInfo = ({selectedUser, setShowStudentInfo }) => {

  const dispatch = useDispatch();
  const currentTestSession = useSelector(state => state.testSession.currentTestSession);

  React.useEffect(() => {
    dispatch(fetchQSbYTsId(currentTestSession.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTestSession])

    if (!selectedUser.id) {
        return null;
    }
    return (
        <Paper
        sx={{ p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: currentTestSession.status !== 'Exam finished'? 240 : 520, }}
        elevation={6}>
            <Grid container spacing={3}>
                <Grid item xs={2} sm={1} lg={1}>
                    <Avatar {...stringAvatar(`${selectedUser.user.firstName} ${selectedUser.user.lastName}`)} />
                </Grid>
                <Grid item xs={12} sm={10} lg={10}>
                    <Typography noWrap variant="h6">
                        {selectedUser.user.firstName} {selectedUser.user.lastName}
                    </Typography>
                    <Typography noWrap variant="subtitle2">
                       email: {selectedUser.user.email}
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={1} lg={1}>
                    <IconButton onClick={() => setShowStudentInfo(false) }>
                        <ClearOutlinedIcon fontSize='small'/>
                    </IconButton>
                </Grid>
                {/* <Grid item xs={12} sm={12} lg={12}> */}
                    
                {/* </Grid> */}
            </Grid>
            {currentTestSession.status !== 'Exam finished'? null :
            <ChartResultExam />}
            
        </Paper>
    )
}