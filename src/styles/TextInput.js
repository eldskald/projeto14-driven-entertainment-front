import styled from "styled-components";

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

export default TextInput;
