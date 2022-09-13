import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import InfoIcon from '@mui/icons-material/Info';
import PaymentsIcon from '@mui/icons-material/Payments';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const AdminListItems = ({ content, setContent }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [openList, setOpenList] = React.useState(true);

  const handleChoiceContent = (key) => {
    setContent(key);
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CorporateFareIcon />
        </ListItemIcon>
        <ListItemText primary="Organization" />
        {openList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton 
            sx={{ pl: 4 }} 
            name="maininfo" 
            selected={selectedIndex === 0}
            onClick={(event) => {
              handleChoiceContent('maininfo');
              handleListItemClick(event, 0);
            }} >
            <ListItemIcon >
              <InfoIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText secondary="Main Information" />
          </ListItemButton>

          <ListItemButton 
            sx={{ pl: 4 }} 
            name="departments"
            selected={selectedIndex === 1}
            onClick={(e) => {
              handleChoiceContent('departments');
              handleListItemClick(e, 1);
            }}>
            <ListItemIcon>
              <PaymentsIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText secondary="Departments" />
          </ListItemButton>

        </List>
      </Collapse>
      <ListItemButton
        // sx={{ pl: 4 }} 
        name="users" 
        selected={selectedIndex === 2}
        onClick={(e) => {
          handleChoiceContent('users');
          handleListItemClick(e, 2);
        }}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Special users" />
      </ListItemButton>
      <ListItemButton
        // sx={{ pl: 4 }} 
        name="roles" 
        selected={selectedIndex === 3}
        onClick={(e) => {
          handleChoiceContent('roles');
          handleListItemClick(e, 3);
        }}>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItemButton>
    </React.Fragment>
  )
};




