import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addOrganization } from "../../store/organizationSlice";
import { Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { addUserToOrg } from "../../store/usersSlice";

const validationSchemaForOrg = Yup.object().shape({
    name: Yup.string()
        .max(128, 'Must be 15 characters or less')
        .required('Required'),
    category: Yup.number()
        .required('Required')
        .nullable(),
    country: Yup.number()
        .required('Required')
        .nullable(),
    state: Yup.number()
        // .required('Required')
        .nullable(),
    city: Yup.number()
        .required('Required')
        .nullable(),
    website: Yup.string().url(),
    // eslint-disable-next-line no-useless-escape
    phone: Yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    adress: Yup.string().max(128, 'Must be 15 characters or less'),
    zip: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, "Must be only digits")
        .test('len', 'Must be exactly 5 characters', val => { if(val) return val.length === 5}),
    terms: Yup.bool().required('Required').oneOf([true], 'Terms must be accepted'),
});

const validationSchemaForUser = Yup.object().shape({

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

const steps = ['Create you Organization', 'Create administrator user', 'Castomize you page'];

export default function RegistrationStepper() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
//   const [isError, setIsError] = React.useState(false);
  const currentOrganization = useSelector(state => state.organization.currentOrganization);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

    const onSubmitAddUser = (values, { setSubmitting }) => {
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
            dispatch(addUserToOrg(addedUser));
            handleComplete();
            setSubmitting(false);
            navigate('/login')
    }

    const onSubmitOrg = (values, { setSubmitting }) => {
        dispatch(addOrganization(values)) 
        setSubmitting(false);
        handleComplete();
    }

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}> */}
                {activeStep === 0? (
                    <Formik
                    validationSchema={validationSchemaForOrg}
                    onSubmit={onSubmitOrg}
                    initialValues = {{
                        name: '',
                        category: '',
                        description: '',
                        country: '',
                        state: '',
                        city: '',
                        website: '',
                        phone: '',
                        adress: '',
                        zip: '',
                        logo: '',
                        backgroundImage: '',
                        terms: false,
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
                    <Container>
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step 1. Create yours organization</Typography>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} md="8">
                                <Form.Label>Organization</Form.Label>
                                <Form.Control
                                    id="validationFormik01"
                                    name="name"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter title of Organization"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    id="validationFormik02"
                                    name="category"
                                    size="lg"
                                    type="category"
                                    value={values.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.category} 
                                >
                                    <option value={null}>Choice category</option>
                                    <option value={1}>University</option>
                                    <option value={2}>College</option>
                                    <option value={3}>Business</option>
                                    <option value={4}>Goverment</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row style={{"marginTop": "20px"}}>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    id="validationFormik03"
                                    name="country"
                                    size="lg"
                                    type="country"
                                    value={values.country}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.country} 
                                >
                                    <option value={null}>Choice country</option>
                                    <option value={1}>USA</option>
                                    <option value={2}>Ukraine</option>
                                    <option value={3}>Spain</option>
                                    <option value={4}>Great Britain</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    id="validationFormik04"
                                    name="state"
                                    size="lg"
                                    type="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.state} 
                                >
                                    <option value={null}>Choice state</option>
                                    <option value={1}>Alabama</option>
                                    <option value={2}>Arkazas</option>
                                    <option value={3}>Florida</option>
                                    <option value={4}>Massachusets</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City</Form.Label>
                                <Form.Select
                                    id="validationFormik05"
                                    name="city"
                                    size="lg"
                                    type="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.city} 
                                >
                                    <option value={null}>Choice city</option>
                                    <option value={1}>Paris</option>
                                    <option value={2}>Kyiv</option>
                                    <option value={3}>Tampa</option>
                                    <option value={4}>London</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row style={{"marginTop": "20px"}}>    
                            <Form.Group as={Col} md="4">
                                <Form.Label>Adress</Form.Label>
                                <Form.Control
                                    id="validationFormik06"
                                    name="adress"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter adress"
                                    value={values.adress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.adress} />
                                <Form.Control.Feedback type="invalid">{errors.adress}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control
                                    id="validationFormik07"
                                    name="zip"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter zip code"
                                    value={values.zip}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.zip} />
                                <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    id="validationFormik08"
                                    name="phone"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.phone} />
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Web site</Form.Label>
                                <Form.Control
                                    id="validationFormik09"
                                    name="website"
                                    size="lg"
                                    type="text"
                                    placeholder="Enter link to your website"
                                    value={values.website}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.website} />
                                <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
                            </Form.Group>
                            <Row style={{"marginTop": "20px"}}>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Logo</Form.Label>
                                    <Form.Control 
                                        id="validationFormik10"
                                        name="logo"
                                        size="lg"
                                        type="file"
                                        placeholder="Enter link to your website"
                                        value={values.logo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.logo} />
                                    <Form.Control.Feedback type="invalid">{errors.logo}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Background image</Form.Label>
                                    <Form.Control 
                                        id="validationFormik11"
                                        name="backgroundImage"
                                        size="lg"
                                        type="file"
                                        placeholder="Enter link to your website"
                                        value={values.backgroundImage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.backgroundImage} />
                                    <Form.Control.Feedback type="invalid">{errors.backgroundImage}</Form.Control.Feedback>
                                </Form.Group>
                            </Row >
                            <Form.Group as={Col} md="6" style={{"marginTop": "20px", "marginLeft": "40%"}}>
                                <Form.Label></Form.Label>
                                <Form.Check
                                    id="validationFormik12"
                                    name="terms"
                                    label="Agree to terms and conditions"
                                    value={values.terms}
                                    onChange={handleChange}
                                    isInvalid={!!errors.terms}
                                    feedback={errors.terms}
                                    feedbackType="invalid"
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                        </Row>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                    Step {activeStep + 1} already completed
                                </Typography>
                                ) : (
                                <Button type="submit">
                                    {completedSteps() === totalSteps() - 1
                                    ? 'Finish'
                                    : 'Create organization'}
                                </Button>
                                ))}
                            </Box>
                    </Form>
                    </Container>
                )}
                </Formik>
                ) : 
                activeStep === 1? (
                    <Formik
                        validationSchema={validationSchemaForUser}
                        onSubmit={onSubmitAddUser}
                        initialValues = {{
                            firstName: '',
                            lastName: '',
                            userName: '',
                            email: '',
                            password: '',
                            role: ''
                        }}>
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
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>Step 2. Add special users</Typography >
                        <Form noValidate onSubmit={handleSubmit}>
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
                                </Col>
                            </Row>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext} sx={{ mr: 1 }}>
                                    Next
                                </Button>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                    ) : (
                                    <Button type="submit">
                                        {completedSteps() === totalSteps() - 1
                                        ? 'Finish'
                                        : 'Complete Step'}
                                    </Button>
                                    ))}
                            </Box>
                        </Form>
                        </Container>
                    )}
                    </Formik>
                ) : null}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
