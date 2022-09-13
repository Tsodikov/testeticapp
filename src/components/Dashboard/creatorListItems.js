import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
// import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';

export const CreatorListItems = ({ content, setContent }) => {

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
              name="sections" 
              selected={selectedIndex === 0}
              onClick={(event) => {
                handleChoiceContent('sections');
                handleListItemClick(event, 0);
              }} >
              <ListItemIcon >
                <ReceiptLongOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Sections" />
            </ListItemButton>

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="createtests"
              selected={selectedIndex === 2}
              onClick={(e) => {
                handleChoiceContent('createtests');
                handleListItemClick(e, 2);
              }}
              >
              <ListItemIcon>
                <BallotOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Tests" />
            </ListItemButton>

            {/* <ListItemButton 
              sx={{ pl: 4 }} 
              name="tests"
              selected={selectedIndex === 3}
              onClick={(e) => {
                handleChoiceContent('tests');
                handleListItemClick(e, 3);
              }}
              >
              <ListItemIcon>
                <BallotOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Tests" />
            </ListItemButton> */}

            <ListItemButton 
              sx={{ pl: 4 }} 
              name="applications"
              selected={selectedIndex === 4}
              onClick={(e) => {
                handleChoiceContent('applications');
                handleListItemClick(e, 4);
              }}>
              <ListItemIcon>
                <AlarmOnIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Applicants" />
            </ListItemButton>

            {/* <ListItemButton 
              sx={{ pl: 4 }} 
              name="passedtests"
              selected={selectedIndex === 5}
              onClick={(e) => {
                handleChoiceContent('passedtests');
                handleListItemClick(e, 5);
              }}>
              <ListItemIcon>
                <AssignmentIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary="Passed tests" />             
            </ListItemButton> */}
          </List>
      </React.Fragment>
    )
  };