import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { login } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [searchParams]=useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

    const userLogin = useSelector(state => state.userLogin);
    const {loading, userInfo, error} = userLogin;

    useEffect( () => {
        if (userInfo){
            navigate(redirect);
        }
    },[userInfo, redirect, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
      }

    return (
        <FormContainer>
            <h1>Sing In</h1>

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) }
                    >
                    </Form.Control>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <br></br>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>

                <Button type="submit" varient="primary" >
                    Sign In 
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?
                    <Link 
                        to = {redirect ? `/register?redirect=${redirect}` : '/register'}
                    >
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
        )
}

export default LoginScreen