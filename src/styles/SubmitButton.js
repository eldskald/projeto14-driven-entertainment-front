import React from 'react';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

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

const SubmitButtonStyle = styled.button`
    width: 100%;
    height: 42px;
    margin: 8px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background-color: var(--maincolor);
    cursor: ${props => props.loading ? 'default' : 'pointer'};
    opacity: ${props => props.loading ? 0.4 : 1};

    font-family: var(--scriptfont);
    font-weight: 500;
    font-size: 20px;
    color: var(--brightcolor);
    text-align: center;
`;

export default SubmitButton;
