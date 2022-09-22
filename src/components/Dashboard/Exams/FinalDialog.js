import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentTestSession, createTestSession } from '../../../store/testSessionSlice';
import { setCurrentUser } from '../../../store/usersSlice';

export default function FinalDialog({ test, openFinalDialog, setConfirm, setOpenFinalDialog }) {

    const dispatch = useDispatch();
    const activeTest = useSelector(state => state.tests.activeTest);
    const currentUser = useSelector(state => state.users.currentUser);

    const handleClose = () => {
        setOpenFinalDialog(false);
    };

    const handleConfirm = () => {
        setOpenFinalDialog(false);
        const newTestSession = {
            testId: test.id,          
            userId: currentUser.id,          
            registrationDateTime: new Date(), 
            confirmationRegister: new Date('1970-01-01'), 
            invitationSended: new Date('1970-01-01'),     
            confirmationInvite: new Date('1970-01-01'),   
            startTest: new Date('1970-01-01'),            
            endTest: new Date('1970-01-01'),
            status: 'registering',
        }
        dispatch(createTestSession(newTestSession));
        setConfirm(true);
        dispatch(clearCurrentTestSession());
        // setRegisterDisabled(true);
    }

    return (
        <Dialog
            open={openFinalDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Exam Application
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once confirmed, your exam application will be submitted.
                    In the near future you will receive confirmation of participation in the exam from your teacher
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
