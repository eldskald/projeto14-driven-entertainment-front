import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import { saveSession } from '../shared/loginPermanence';

import MinorHeader from '../styles/MinorHeader';
import Title from '../styles/Title';
import TextInput from '../styles/TextInput.js';
import SubmitButton from '../styles/SubmitButton.js';
import ErrorMessage from '../styles/ErrorMessage.js';
import LinkButton from '../styles/LinkButton';

const API_URL = process.env.REACT_APP_API_URL;

function Login() {

    const { setToken, setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitting, setSubmitting] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        setSubmitting('loading');
        const body = { email, password };
        axios.post(`${API_URL}/login`, body)
            .then(res => {
                setToken(res.data.token);
                setUsername(res.data.username);
                saveSession(res.data.token);
                navigate('/');
            })
            .catch(err => {
                setError(err.response.data);
                setSubmitting('');
            });
    }

    return (
        <>
            <MinorHeader />
            <Container>
                <Title>Login</Title>
                <Form onSubmit={handleSubmit}>
                    <TextInput
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={submitting}
                    />
                    <TextInput
                        type='password'
                        placeholder='senha'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={submitting}
                    />
                    <SubmitButton text='Login' loading={submitting} type='submit' />
                </Form>
                <ErrorMessage error={error} />
                <LinkButton onClick={() => navigate('/sign-up')}>
                    Don't have an account? Sign up!
                </LinkButton>
            </Container>
        </>

    );
}

const Container = styled.div`
    width: 800px;
    margin: 160px auto 0px auto;

    padding: 0px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 800px) {
        width: 100%;
    }
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Login;