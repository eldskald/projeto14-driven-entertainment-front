import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import MinorHeader from '../styles/MinorHeader.js';
import Title from '../styles/Title.js';
import TextInput from '../styles/TextInput.js';
import SubmitButton from '../styles/SubmitButton.js';
import ErrorMessage from '../styles/ErrorMessage.js';
import LinkButton from '../styles/LinkButton.js';

const API_URL = process.env.REACT_APP_API_URL;

function SignUp() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [submitting, setSubmitting] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (password !== passwordConfirm) {
            setError('Passwords do not match!');
            return;
        }

        setSubmitting('loading');
        const body = { name, email, password };
        axios.post(`${API_URL}/signup`, body)
            .then(() => {navigate('/login')})
            .catch(err => {
                console.log(err);
                setError(err.response.data);
                setSubmitting('');
            });
    }

    return (
        <>
            <MinorHeader />
            <Container>
                <Title>Sign Up</Title>
                <Form onSubmit={handleSubmit}>
                    <TextInput
                        type='text'
                        placeholder='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={submitting}
                    />
                    <TextInput
                        type='email'
                        placeholder='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={submitting}
                    />
                    <TextInput
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={submitting}
                    />
                    <TextInput
                        type='password'
                        placeholder='confirm your password'
                        value={passwordConfirm}
                        onChange={e => setPasswordConfirm(e.target.value)}
                        disabled={submitting}
                    />
                    <SubmitButton text='Register' loading={submitting} type='submit' />
                </Form>
                <ErrorMessage error={error} />
                <LinkButton onClick={() => navigate('/login')}>
                    Already have an account? Login!
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

    @media(max-width: 800px) {
        width: 100%;
    }
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default SignUp;