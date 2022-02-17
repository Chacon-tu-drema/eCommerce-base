import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { register } from '../actions/userActions'

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [searchParams]=useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;

    useEffect( () => {
        if (userInfo){
            navigate(redirect);
        }
    },[userInfo, redirect, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password))
        }

        
      }

  return (
    <FormContainer>
        <h1>Sing In</h1>
        {message &&  <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
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
                    required
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                >
                </Form.Control>
            </Form.Group>

            <br></br>

            <Button type="submit" varient="primary" >
                Register 
            </Button>
        </Form>

        <Row className="py-3">
            <Col>
                Have an Account?
                <Link 
                    to = {redirect ? `/login?redirect=${redirect}` : '/login'}
                >
                    Sign In
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default RegisterScreen