import * as React from 'react';
import { Avatar, Grid, Paper, Typography } from "@mui/material"

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

export const StudentInfo = ({selectedUser}) => {

    if (!selectedUser.id) {
        return null;
    }
    return (
        <Paper
            sx={{ p: 2, width: '100%', overflow: 'hidden' }}
            elevation={6}
        >
            <Grid container spacing={3}>
                <Grid item xs={2} sm={2} lg={2}>
                    <Avatar {...stringAvatar(`${selectedUser.user.firstName} ${selectedUser.user.lastName}`)} />
                </Grid>
                <Grid item xs={10} sm={10} lg={10}>
                    <Typography noWrap variant="h6">
                        {selectedUser.user.firstName} {selectedUser.user.lastName}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <Typography noWrap variant="subtitle2">
                       email: {selectedUser.user.email}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}