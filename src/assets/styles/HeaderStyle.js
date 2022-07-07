import styled from "styled-components";

const HeaderStyle = styled.div`
    position: absolute;
    width: 100%;
    height: 160px;
    top: 0px;
    left: 0px;

    padding: 0px 32px;
    display: flex;
    align-items: center;
    justify-content:space-between;

    background-color: var(--brightcolor);
    box-shadow: 0px 4px 4px #c0c0c0;
    cursor: pointer;

    font-size: 18px;

    > p {
        font-family: var(--displayfont);
        font-size: 50px;
        color: var(--maincolor);
        
    }
    > div > ion-icon, > ion-icon{
        font-size:46px;
    }

    @media(max-width: 660px) {
        font-size: 15px;
        height: 100px;
        >p{
        font-size: 20px;
        }
        > div  ion-icon, > ion-icon{
        font-size:30px;
        }
        > a > img{
            height:30px;
            width:32px;
        }
    }
    
`;

export default HeaderStyle;