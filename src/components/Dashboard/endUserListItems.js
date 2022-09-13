import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

export const EndUserListItems = ({ content, setContent }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    // const [openList, setOpenList] = React.useState(true);
  
    const handleChoiceContent = (key) => {
      setContent(key);
    }
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    // const handleClick = () => {
    //   setOpenList(!openList);
    // };
  
    return (
      <React.Fragment>
          <List component="div" disablePadding>
            <ListItemButton 
              sx={{ pl: 4 }} 
              name="exams" 
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleChoiceContent('exams');
                handleListItemClick(event, 0);
              }} >
              <ListItemIcon >
                <BallotOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Exams list" />
            </ListItemButton>

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="waitinglist" 
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleChoiceContent('waitinglist');
                handleListItemClick(event, 1);
              }} >
              <ListItemIcon >
                <HourglassEmptyIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="My exams" />
            </ListItemButton>

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="invitation"
              selected={selectedIndex === 2}
              onClick={(e) => {
                handleChoiceContent('invitation');
                handleListItemClick(e, 2);
              }}
              >
              <ListItemIcon>
                <InsertInvitationIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Invitation" />
            </ListItemButton>

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="readyforexam"
              selected={selectedIndex === 3}
              onClick={(e) => {
                handleChoiceContent('readyforexam');
                handleListItemClick(e, 3);
              }}>
              <ListItemIcon>
                <AlarmOnIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Ready for exam" />
            </ListItemButton>

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="passedtests"
              selected={selectedIndex === 4}
              onClick={(e) => {
                handleChoiceContent('passedtests');
                handleListItemClick(e, 4);
              }}>
              <ListItemIcon>
                <AssignmentIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Passed tests" />
            </ListItemButton>

          </List>
      </React.Fragment>
    )
  };