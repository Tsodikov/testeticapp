import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import { addOrganization } from "../../store/organizationSlice";
import { useNavigate } from 'react-router-dom';
import { addUserToOrg } from "../../store/usersSlice";
import { Grid, MenuItem } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { category, cities, country, region } from '../../.data';
import { useEffect } from 'react';

const steps = [
    'Create you Organization',
    'Create administrator user',
    // 'Castomize you page'
];

export default function RegistrationStepper() {

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [addedUser, setAddedUser] = React.useState({});
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

    const isOrgFill = (errors) => {
        if (errors.name || errors.adress || errors.category || errors.country || errors.city) {
            return false;
        } 
        return true;
    }

    const isUserFill = (errors) => {
        if (Object.values(errors).length === 0 ) {
            return true;
        } 
        return false;
    }

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

    const onSubmitOrg = (values, { setSubmitting }) => {
        // dispatch(setEditingOrganization(values));
        setAddedUser({
            firstName: values.firstName,
            lastName: values.lastName,
            name: values.userName,
            email: values.email,
            password: values.password,
            active: true,
            avatar: 'https://detector.media/doc/images/news/archive/2013/87531/ArticleImage_87531.jpg',
            role: 'ADMIN',
        })
        dispatch(addOrganization({
            name: values.name,
            category: values.category,
            description: '',
            country: values.country,
            state: values.region.value,
            city: values.city.value,
            website: values.website,
            phone: '',
            adress: values.adress,
            zip: values.zip,
            logo: '',
            backgroundImage: '',
            terms: true,
        }));
        setSubmitting(false);
        handleComplete();
    }

    useEffect(() => {
        if (currentOrganization.id) {
            dispatch(addUserToOrg({
                userData: addedUser,
                orgId: currentOrganization.id,
            }));
            handleComplete();
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentOrganization])

  return (
    <Box sx={{ width: '68%', margin: 'auto' }}>
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
                </StepButton>
            </Step>
            ))}
        </Stepper>
        <React.Fragment>
            <Formik
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {errors.name = "Назва обов'язкова"
                        } else if (
                            !/[\u0410-\u044F]/g.test(values.name)
                        ) {errors.name = "Оберить українську"}
                        else if (!/[\u0410-\u042F]/g.test(values.name)) {errors.name = "Перша велика"}
                    if (!values.adress) errors.adress = "Адреса обов'язкова"
                    if (!values.category) errors.category = "Категорія виші обов'язкова"
                    if (!values.country) errors.country = "Країна обов'язкова"
                    if (!values.city) errors.city ="Город обов'язковий"
                    if (!values.email) {errors.email = "Пошта обов'язкова"
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                        ) {errors.email = 'Invalid email address';}
                    if (!values.firstName) {errors.firstName = "Поле обов'язкове";
                        } else if (
                            /^[A-Z]{2,30}$/.test(values.firstName)
                        ) {errors.firstName = "Перша заглавна"}
                    if (!values.lastName) errors.lastName = "Поле обов'язкове";
                    if (!values.password) errors.password = "Поле обов'язкове";
                    return errors;
                }}
                onSubmit={onSubmitOrg}
                initialValues = {{
                    name: '',
                    category: '',
                    // description: '',
                    country: "Україна",
                    region: {
                        value: '',
                        label: '',
                    },
                    city: {
                        value: '',
                        label: '',
                    },
                    website: '',
                    // phone: '',
                    adress: '',
                    zip: '',
                    logo: '',
                    backgroundImage: '',
                    // terms: false,
                    firstName: '',
                    lastName: '',
                    userName: '',
                    email: '',
                    password: '',
                    role: '',
                }}
            >
            {({ values, submitForm, resetForm, isSubmitting, touched, errors }) => (
                activeStep === 0? (
                <React.Fragment>
                    <Grid container spacing={3} component={Form}>
                        <Grid item xs={12} sm={12} lg={12} />
                            <Grid item xs={12} sm={8} lg={8}>
                                <Field
                                    component={TextField}
                                    name="name"
                                    type="text"
                                    style={{width: "100%", marginTop: "1rem"}}
                                    label="Назва виші"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} lg={4}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="category"
                                    label="Категорія виші"
                                    style={{width: "100%"}}
                                    select
                                    variant="standard"
                                    margin="normal"
                                >
                                    {category.map(item => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={4} lg={4}>
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="country"
                                    label="Країна"
                                    style={{width: "100%"}}
                                    select
                                    variant="standard"
                                    margin="normal"
                                >
                                    {country.map(item => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={4} lg={4}>
                            <Field
                                    name="region"
                                    component={Autocomplete}
                                    options={region}
                                    getOptionLabel={option => option.label}
                                    style={{width: "100%", marginTop: "1rem"}}
                                    renderInput={(params) => (
                                        <MuiTextField
                                            {...params}
                                            name="region"
                                            error={touched['region'] && !!errors['region']}
                                            helperText={touched['region'] && errors['region']}
                                            label="Область"
                                            variant="standard"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} lg={4}>
                                <Field
                                    name="city"
                                    component={Autocomplete}
                                    options={cities}
                                    getOptionLabel={option => option.label}
                                    style={{width: "100%", marginTop: "1rem"}}
                                    renderInput={(params) => (
                                        <MuiTextField
                                            {...params}
                                            name="city"
                                            error={touched['city'] && !!errors['city']}
                                            helperText={touched['city'] && errors['city']}
                                            label="Город"
                                            variant="standard"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} />
                            <Grid item xs={12} sm={4} lg={4}>
                                <Field
                                    component={TextField}
                                    name="adress"
                                    type="text"
                                    label="Адреса"
                                    variant="standard"
                                    style={{width: "100%"}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} lg={2}>
                                <Field
                                    component={TextField}
                                    name="zip"
                                    type="text"
                                    label="Поштовий індекс"
                                    variant="standard"
                                    style={{width: "100%"}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <Field
                                    component={TextField}
                                    name="website"
                                    type="text"
                                    label="Веб сайт"
                                    variant="standard"
                                    style={{width: "100%"}}
                                />
                            </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop: "2rem" }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button 
                            onClick={handleNext} 
                            sx={{ mr: 1 }}
                            disabled={!isOrgFill(errors)}>
                            Next
                        </Button>
                    </Box>
                </React.Fragment>) 
                : activeStep === 1? (
                    <React.Fragment>
                        <Grid container spacing={3} component={Form}>
                            <Grid item xs={12} sm={12} lg={12} />
                                <Grid item xs={12} sm={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        name="firstName"
                                        type="text"
                                        style={{width: "100%", marginTop: "1rem"}}
                                        label="Ім'я"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        name="lastName"
                                        type="text"
                                        style={{width: "100%", marginTop: "1rem"}}
                                        label="Фамілія"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        name="userName"
                                        type="text"
                                        style={{width: "100%", marginTop: "1rem"}}
                                        label="Нікнейм"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        style={{width: "100%", marginTop: "1rem"}}
                                        label="Єлектронна пошта"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="password"
                                        type="password"
                                        style={{width: "100%", marginTop: "1rem"}}
                                        label="Пароль"
                                        variant="standard"
                                    />
                                </Grid>
                        </Grid>
                       <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginTop: "2rem" }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                            <Button type="submit" onClick={submitForm} disabled={!isUserFill(errors)}>
                                Finish
                            </Button>
                        </Box> 
                    </React.Fragment>
                ) : null)}
            </Formik>
            </React.Fragment>    
        </Box>
    )
}