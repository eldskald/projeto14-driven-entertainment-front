import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderStyle from "../assets/styles/HeaderStyle.js";
import chart from "../assets/images/chart.png";
import ChartContext from '../shared/chartContext.js';


export default function Header({children, isLogin}){
    const navigate=useNavigate();
    const {countProductsSelected}=useContext(ChartContext);
    return (
        <HeaderStyle>
           <p onClick={()=>navigate('/')}>Driven<br/>Entertainment</p>
           <User>
           <ion-icon name="person-circle-outline"></ion-icon>
           {children}
           </User>
           <ChartDiv>
            <span>{countProductsSelected}</span>
            <Link to={'/chart'}> <Chart src={chart}/> </Link>
            Carrinho
           </ChartDiv>
           <Logout isLogin={isLogin}>
            <ion-icon  name="log-out-outline"></ion-icon>
            Sair
           </Logout>
           
        </HeaderStyle>
    );
}

const Chart=styled.img`
    width: 48px;
    height: 46px;
`;

const User=styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    
    > ion-icon{
        margin-right:0.5rem;
    }
`;

const ChartDiv=styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content:center;
    align-items:center;
    position:relative;
    > span{
        position:absolute;
        background-color:var(--maincolor);
        width:50%;
        top:10px;
        right:5px;
        color:var(--brightcolor);
        border-radius:50%;
        aspect-ratio:1;
        display:flex;
        align-items:center;
        justify-content:center;
    }
`;

const Logout=styled.div`
    display:${props=>props.isLogin ? 'flex': 'none' };
    > ion-icon {
        font-size:46px;
    }
    flex-direction:column;
    height:100%;
    justify-content:center;
    align-items:center;  
`;

