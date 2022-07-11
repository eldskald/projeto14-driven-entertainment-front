import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function saveSession(token) {
    localStorage.setItem('sessionToken', token);
}

export function endSession(setToken, setUsername, setLibrary) {
    localStorage.removeItem('sessionToken');
    setToken('');
    setUsername('');
    setLibrary([]);
}

export function loadSession(setToken, setUsername, setLibrary, setShoppingCart) {
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
            setLibrary([...res.data.library]);
            setShoppingCart([...res.data.cart]);
            setToken(data);
        })
        .catch(() => {
            endSession(setToken, setUsername, setLibrary);
        });
}
