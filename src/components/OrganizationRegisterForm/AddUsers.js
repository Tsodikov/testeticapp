import { Container, Form, Stack, Row, Card, Col, Button, ListGroup } from "react-bootstrap";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToOrg, fetchUsersToOrg, usersSelector } from "../../store/usersSlice";
import { useEffect, useState } from 'react';
import { MessageModal } from "../messages/MessageModal";

const validationSchema = Yup.object().shape({

    firstName: Yup.string()
    .max(20, 'Must be 15 characters or less')
    .required(),
    lastName: Yup.string()
    .max(20, 'Must be 15 characters or less')
    .required(),
    userName: Yup.string()
    .max(20, 'Must be 15 characters or less')
    .required(),
    email: Yup.string().email().required(),
    password: Yup.string().required()
});

export const AddUsers = ({setIsError}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const currentOrganization = useSelector(state => state.organization.currentOrganization);
    const registerStatus = useSelector(state => state.users.registerStatus);
    const currentUser = useSelector(state => state.users.currentUser);

    // const convertRole = (roleNum) => {
    //     switch (roleNum) {
    //         case '1': return 'ADMIN';
    //         case '2': return 'CREATOR';
    //         // case '3': return 'SUPERVISER';
    //         default: return 'END_USER';
    //     }
    // }

    const onSubmit = (values, { setSubmitting }) => {
        console.log('onSubmit')

        const addedUser = {
            userData: {
                firstName: values.firstName,
                lastName: values.lastName,
                name: values.userName,
                email: values.email,
                password: values.password,
                active: true,
                avatar: 'https://detector.media/doc/images/news/archive/2013/87531/ArticleImage_87531.jpg',
                role: 'ADMIN',
            },
            orgId: currentOrganization.id,
        }
        // console.log(addedUser)
        dispatch(addUserToOrg(addedUser));
        setSubmitting(false);
    }

    // useEffect(() => {
    //   registerStatus? setShowModal(true) : setShowModal(false);
    // }, [registerStatus]);

    const usersList = useSelector(usersSelector);
    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);

    if (usersLoadingStatus === 'error') {
        <MessageModal 
            showModal={true}
            header={"Error adding user"}
            message={registerStatus}
            type={"warning"}
            button={"Close"} />
    }
    
    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues = {{
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                role: ''
            }}
        >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            isInvalid,
            errors,
        }) => (
            <Container fluid>
            <h4>Step 2. Add special users</h4>
            <Form noValidate onSubmit={handleSubmit}>
            {setIsError(Object.values(errors).length !== 0)}

                <Row>
                    <Col>
                        <Row>
                            <Form.Group as={Col} md="6" controlId="firstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter first name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.firstName} />
                                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            </Form.Group>
                            {/* <Form.Group as={Col} md="6" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="role"
                                    size="lg"
                                    type="role"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.role} 
                                >
                                    <option value={null}>Choice Role...</option>
                                    <option value={1}>ADMIN</option>
                                    <option value={2}>CREATOR</option>
                                </Form.Select>
                            </Form.Group> */}
                        </Row>
                        <Row style={{"marginTop": "15px"}}>
                            <Form.Group as={Col} md="6" controlId="lastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter last name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.lastName} />
                                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.email} />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row style={{"marginTop": "15px"}}>
                            <Form.Group as={Col} md="6" controlId="userName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name="userName"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter user name"
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.userName} />
                                <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    size="lg"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.password} />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        {/* <Row style={{"marginTop": "25px"}}>
                            <Stack className="d-flex justify-content-between align-items-start" direction="horizontal" gap={2}>
                                <Button className='ms-auto' variant="outline-primary" type="button"
                                    onClick={() => navigate('/orgregistration')}>
                                    Back
                                </Button>
                                <Button variant="outline-primary" type="submit">
                                    Add user
                                </Button>
                                <Button variant="outline-primary" type="button" 
                                    onClick={
                                        currentUser.role === 'END_USER'? navigate('/login') : 
                                        currentUser.role === 'CREATOR'? navigate('/login') : 
                                        currentUser.role === 'ADMIN'? navigate('/login') : null
                                    }>
                                    Finish
                                </Button>
                            </Stack>
                        </Row> */}
                    </Col>
                    {/* <Col>
                        <Card md="6" style={{"marginTop": "30px"}}>
                            <Card.Header className="col-header">
                                Users List
                            </Card.Header>
                            <Card.Body >
                                {usersList.length === 0? null : 
                                    usersList.map((user, i) => {
                                        return (
                                            <ListGroup.Item key={i}>
                                                <Stack direction="horizontal" gap={2}>
                                                    <div>{user.firstName}</div>
                                                    <div>{user.lastName}</div>
                                                    <div>{user.email}</div>
                                                    <div>{user.role}</div>
                                                </Stack>
                                            </ListGroup.Item>
                                        )
                                    })
                                } 
                            </Card.Body>
                        </Card>
                    </Col>     */}
                </Row>
            </Form>
            </Container>
        )}
        </Formik>
    )
}