import { useState } from "react";
import { Alert } from "react-bootstrap";

export const HttpError = ({err}) => {
    
    const [showAlert, setShowAlert] = useState(false);

    return (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{err}</p>
        </Alert>
    );
}