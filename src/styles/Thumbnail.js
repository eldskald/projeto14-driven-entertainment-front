import styled from 'styled-components';

function Thumbnail({ artUrl }) {
    return (
        <Container>
            <img src={artUrl} alt='Cover'/>
        </Container>
    );
}

const Container = styled.div`
    width: 140px;
    height: 200px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    border-radius: 16px;
    box-shadow: 0px 0px 4px 4px #c0c0c0;
    cursor: pointer;

    > img {
        min-height: 100%;
        min-width: 100%;
        object-fit: cover;
    }
`;

export default Thumbnail;
