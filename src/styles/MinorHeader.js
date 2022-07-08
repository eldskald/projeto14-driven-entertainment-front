import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MinorHeader() {
    const navigate = useNavigate();
    return (
        <OuterContainer>
            <InnerContainer>
                <Logo onClick={() => navigate('/')}>
                    Driven<br />Entertainment
                </Logo>
            </InnerContainer>
        </OuterContainer>
    );
}

const OuterContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100px;
    top: 0px;
    left: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--brightcolor);
    box-shadow: 0px 4px 4px #c0c0c0;
`;

const InnerContainer = styled.div`
    width: 1200px;

    padding: 0px 32px;
    display: flex;
    align-items: center;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const Logo = styled.div`
    font-family: var(--displayfont);
    font-size: 36px;
    color: var(--maincolor);
    cursor: pointer;
`;

export default MinorHeader;
