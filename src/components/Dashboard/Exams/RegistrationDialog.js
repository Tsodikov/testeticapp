import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { DialogContent, DialogContentText } from '@mui/material';

export function RegistrationDialog({items, onClose, selectedValue, open }) {

    const currentUser = useSelector(state => state.users.currentUser);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            {currentUser.id? <>
                <DialogTitle>Choice your variant for registration</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {items.map((item) => (
                    <ListItem button onClick={() => handleListItemClick(item)} key={item}>
                        <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <PersonIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item} />
                    </ListItem>
                    ))}
                </List></> : 
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You need to login to register for the exam
                </DialogContentText>
            </DialogContent>
            }
        </Dialog>
    );
}

RegistrationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
