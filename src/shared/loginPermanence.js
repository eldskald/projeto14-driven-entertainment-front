import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function saveSession(token) {
    localStorage.setItem('sessionToken', token);
}

export function endSession(setToken, setUsername) {
    localStorage.removeItem('sessionToken');
    setToken('');
    setUsername('');
}

export function loadSession(setToken, setUsername) {
    const data = localStorage.getItem('sessionToken');
    if (!data) {
        return;
    }

    axios.get(`${API_URL}/session`, {
        headers: {
            Authorization: `Bearer ${data}`,
        }
    })
        .then(res => {
            setUsername(res.data.username);
            setToken(data);
        })
        .catch(() => {
            endSession(setToken, setUsername);
        });
}
