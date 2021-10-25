import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Layout from './shared/Layout';

const SignupDetail = () => {
    const [programs, setPrograms] = useState([]);
    const [graduationYears, setGraduationYears] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [prog, setProgs] = useState('');
    const [matricNum, setMatricNum] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState([]);

    let history = useHistory();

    useEffect(() => {
        fetch("/api/programs")
            .then(item => item.json())
            .then((data) => {
                setPrograms(data);
            });

        fetch("/api/graduationYears")
            .then(resp => resp.json())
            .then((res) => {
                setGraduationYears(res)
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
         switch (name) {
            case "firstname":
                setFirstName(value);
                break;
            case "lastname":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "passWord":
                setPassWord(value);
                break;
            case "prog":
                setProgs(value);
                break;
            case "matricNum":
                setMatricNum(value);
                break;
            case "gradYear":
                setGradYear(value);
                break;
        }
    };

    const handlesubmit = event => {
        event.preventDefault();

        let regInfo = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: passWord,
            matricNumber: matricNum,
            program: prog,
            graduationYear: gradYear,
        };

        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(regInfo),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.status === "ok") {
                    document.cookie = `uid=${response.data.id}; domain=; path=/ `;
                    history.push("/");
                } else {
                    setShowAlert(true);
                    setAlertText(response.errors);
                }
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <div className="mx-auto w-50 p-3 mw-70">
                <h1>Signup</h1>
                <Form id="signupForm" onSubmit={handlesubmit}>
                    <Alert
                        className="alert alert-danger"
                        variant="danger"
                        show={showAlert}
                    >
                        {alertText.map((item) => {
                            return (
                                <div>
                                    {item}
                            
                                </div>
                            );
                        })}
                    </Alert>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                value={firstName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={lastName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name= "passWord"
                                value={passWord}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} xs={6}>
                            <Form.Label>Program:</Form.Label>
                            <Form.Control
                                as="select"
                                value={prog}
                                name="program"
                                onChange={handleChange}
                            >
                                <option>Select Option</option>
                                {programs.map((program) => (
                                    <option key={program}>{program}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Matric Number:</Form.Label>
                            <Form.Control
                                name="matricNum"
                                value={matricNum}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Graduation Year:</Form.Label>
                            <Form.Control
                                as="select"
                                name="graduationYear"
                                value={gradYear}
                                onChange={handleChange}
                            >
                                <option>Select Option</option>
                                {graduationYears.map((year) => (
                                    <option key={year}>{year}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </>
    );

};

const Signup = () => {
    return (
        <Layout>
            <SignupDetail />
        </Layout>
    );
};


export default Signup