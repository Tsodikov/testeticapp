import { Container, Form, Stack, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addOrganization } from "../../store/organizationSlice";

const validationSchema = Yup.object().shape({
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

export const OrganizationRegisterForm = ({setShowHeader}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values, { setSubmitting }) => {
        dispatch(addOrganization(values)) 
        setSubmitting(false);
        navigate('/addusers')
    }

    return (
        <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
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
            <h4>Step 1. Create yours organization</h4>
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
                            onChange={handleChange}
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                </Row>
                <Stack className="justify-content-md-center" style={{"marginTop": "50px"}} direction="horizontal" gap={3}>
                    <Button md={1} variant="outline-primary" type="button"
                        onClick={() => setShowHeader(true)}>
                        Cancel
                    </Button>
                    <Button md={1} variant="outline-primary" type="submit">
                        Next
                    </Button>
                </Stack>
            </Form>
            </Container>
        )}
        </Formik>
    );
}