import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../shared/userContext';

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
                console.log(res.data.token);
                setToken(res.data.token);
                setUsername(res.data.username);
                navigate('/');
            })
            .catch(err => {
                setError(err.response.data);
                setSubmitting('');
            });
    }

    function SubmitButton({ text, loading }) {
        return (
            <SubmitButtonStyle loading={loading} disabled={loading}>
                {loading ? (
                    <ThreeDots color='var(--brightcolor)' />
                ) : (
                    text
                )}
            </SubmitButtonStyle>
        )
    }

    function ErrorMessage({ error }) {
        if (error) {
            return <Message>{error}</Message>;
        }
        return <></>;
    }

    return (
        <>
            <Header onClick={() => navigate('/')}>
                <p>Driven<br/>Entertainment</p>
            </Header>
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

const Header = styled.div`
    position: absolute;
    width: 100%;
    height: 160px;
    top: 0px;
    left: 0px;

    padding: 0px 32px;
    display: flex;
    align-items: center;

    background-color: var(--brightcolor);
    box-shadow: 0px 4px 4px #c0c0c0;
    cursor: pointer;

    > p {
        font-family: var(--displayfont);
        font-size: 50px;
        color: var(--maincolor);
    }
`;

const Container = styled.div`
    width: 1000px;
    margin: 256px auto 0px auto;

    padding: 0px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: 1000px) {
        width: 100%;
        margin: 200px auto 0px auto;
    }
`;

const Title = styled.div`
    width: 100%;
    height: 64px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: var(--scriptfont);
    font-size: 52px;
    font-weight: 500;
    color: var(--darkcolor);
`;

const Form = styled.form`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextInput = styled.input`
    width: 100%;
    height: 42px;
    margin: 8px 0px;
    padding-left: 16px;
    border: 1px solid var(--darkcolor);
    border-radius: 8px;
    outline: none;
    background-color: var(--brightcolor);
    font-size: 20px;
    color: var(--darkcolor);
    :placeholder {
        color: var(--graycolor);
    }
    :disabled {
        background-color: var(--graycolor);
    }
`;

const SubmitButtonStyle = styled.button`
    width: 100%;
    height: 42px;
    margin: 8px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-radius: 8px;
    background-color: var(--maincolor);
    cursor: ${props => props.loading ? "default" : "pointer"};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 20px;
    color: var(--brightcolor);
    text-align: center;
`;

const Message = styled.div`
    margin: 4px;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--errcolor);
`;

const LinkButton = styled.div`
    margin: 32px 0px;
    cursor: pointer;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--maincolor);
    text-decoration: underline;
`;

export default Login;