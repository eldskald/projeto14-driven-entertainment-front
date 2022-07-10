import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../shared/cartContext.js";
import UserContext from "../shared/userContext.js";
import { endSession } from "../shared/loginPermanence.js";

export default function Header() {
    const navigate = useNavigate();
    const { shoppingCart } = useContext(CartContext);
    const { username, setToken, setUsername } = useContext(UserContext);

    const [popup, setPopup] = useState("");

    function logout() {
        endSession(setToken, setUsername);
    }

    function PopupMenu() {
        return (
            <>
                {username ? (
                    <p onClick={logout}>Logout</p>
                ) : (
                    <>
                        <p onClick={() => navigate("/login")}>Login</p>
                        <p onClick={() => navigate("/sign-up")}>Sign Up</p>
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <OuterContainer>
                <InnerContainer>
                    <Logo onClick={() => navigate("/")}>
                        Driven
                        <br />
                        Entertainment
                    </Logo>
                    <RightContainer>
                        <CartContainer onClick={() => navigate("/cart")}>
                            <ion-icon name="cart-outline"></ion-icon>
                            <span>{shoppingCart.length}</span>
                        </CartContainer>
                        <User>
                            <ion-icon name="person-circle-outline"></ion-icon>
                            {username ? (
                                <AuthLegend>
                                    <div>
                                        {`Hello, ${username}!`}
                                        <br />
                                        <div onClick={logout}>Logout</div>
                                    </div>
                                </AuthLegend>
                            ) : (
                                <AuthLegend>
                                    <p>
                                        {"Welcome :)"}
                                        <br />
                                        <Link to={"/login"}>Login</Link> or{" "}
                                        <Link to={"/sign-up"}>Sign up</Link>
                                    </p>
                                </AuthLegend>
                            )}
                        </User>
                        <MobileUserIcon onClick={() => setPopup("active")}>
                            <ion-icon name="person-circle-outline"></ion-icon>
                        </MobileUserIcon>
                    </RightContainer>
                </InnerContainer>
            </OuterContainer>
            {popup ? (
                <>
                    <PopupBackground onClick={() => setPopup("")} />
                    <PopupContainer>
                        <PopupMenu />
                    </PopupContainer>
                </>
            ) : (
                <></>
            )}
        </>
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
    justify-content: space-between;

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

const RightContainer = styled.div`
    display: flex;
    align-items: center;
`;

const User = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > ion-icon {
        font-size: 48px;
        margin-right: 0.5rem;
    }

    @media (max-width: 800px) {
        display: none;
    }
`;

const AuthLegend = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--scriptfont);
    font-weight: 500;
    line-height: 19px;
    color: var(--darkcolor);

    > div > div {
        width: fit-content;
        margin-top: 4px;
        cursor: pointer;

        :hover {
            color: var(--maincolor);
        }
    }

    > p > a {
        margin-top: 4px;
        text-decoration: none;
        color: var(--darkcolor);

        :hover {
            color: var(--maincolor);
        }
    }
`;

const MobileUserIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > ion-icon {
        font-size: 48px;
    }

    @media (min-width: 800px) {
        display: none;
    }
`;

const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 32px;
    cursor: pointer;

    > span {
        position: absolute;
        background-color: var(--maincolor);
        width: 60%;
        top: -5px;
        right: -2px;
        color: var(--brightcolor);
        border: 2px solid var(--brightcolor);
        border-radius: 50%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    > ion-icon {
        font-size: 48px;
        color: var(--darkcolor);
    }

    @media (max-width: 800px) {
        margin-right: 12px;
    }
`;

const PopupBackground = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    background-color: rgba(0, 0, 0, 0.5);
`;

const PopupContainer = styled.div`
    position: absolute;
    top: 32px;
    right: 32px;

    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: var(--brightcolor);
    border: 1px solid var(--graycolor);
    border-radius: 16px;
    box-shadow: 0px 0px 4px 4px #606060;

    > p {
        font-family: var(--scriptfont);
        font-size: 24px;
        margin: 8px 0px;
        cursor: pointer;
    }
`;
