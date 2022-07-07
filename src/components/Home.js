import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../shared/userContext';
import Header from './Header.js';

function Home() {
    const { username } = useContext(UserContext);
    
    return (
          
            <Header isLogin={Boolean(username)}>
                { username ? `Bom dia ${username}!` :
                 <AuthLegend> 
                    <p>Bem vindo :) 
                        <br/>
                        <Link to={'/login'}>{'Entre'}</Link> ou <Link to={'/sign-up'}>{'cadastre-se'}</Link>
                    </p>
                 </AuthLegend>  }
            </Header>

        
    );
}

const AuthLegend = styled.div `
display:flex;
align-items:center;
justify-content:center;
height:100%;
> p a{
    text-decoration:none;
    color:var(--darkcolor);
}

`

export default Home;
