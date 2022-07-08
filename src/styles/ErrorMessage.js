import React from 'react';
import styled from 'styled-components';

function ErrorMessage({ error }) {
    if (error) {
        return <Message>{error}</Message>;
    }
    return <></>;
}

const Message = styled.div`
    margin: 4px;
    font-family: var(--scriptfont);
    font-size: 20px;
    color: var(--errcolor);
`;

export default ErrorMessage;
