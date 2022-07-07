import { useContext } from 'react';
import UserContext from '../shared/userContext';

function Home() {
    const { username } = useContext(UserContext);
    return (
        <>{ username ? `Bom dia ${username}!` : 'Ninguém logado'}</>
    );
}

export default Home;
