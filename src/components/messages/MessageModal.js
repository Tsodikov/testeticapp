import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setRegisterStatus } from "../../store/usersSlice";

export const MessageModal = ({ showModal, header, message, type, button }) => {
    const [show, setShow] = useState(showModal);
    const onClose = () => {
        setShow(false);
        setRegisterStatus(null);
    }
    
    return (
        <Alert
            show={show} 
            variant={type} 
            onClose={onClose} 
            dismissible>
            <Alert.Heading>{header}</Alert.Heading>
            <p>{message}</p>
            {
                button === '' ? null : 
                <div className="d-flex justify-content-end">
                    <Button 
                        onClick={onClose} 
                        variant={`outline-${type}`}>
                        {button}
                    </Button>
                </div>
            }
        </Alert>
    );
}