import { styled } from "styled-components";

export const BalanceBox = styled.div`
  width: 370px;
  height: 370px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transition: 0.3s ease-in-out;
  border: 1px solid #000;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      transform: translateY(-10px);
    }
  }
`;

export const BalanceTextBox = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
`;
export const BestBalanceTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto 0;
  font-size: 2rem;
`;

export const BestBalanceTitleSpan = styled.span`
  color: ${(props) => (props.color === "F47070" ? "#ff0000" : "#7095F4")};
  margin-right: 5px;
`;

export const WriteButtonBox = styled.div`
  width: 33.333%;
  display: flex;
  margin-left: auto;
`;

export const ButtonStyles = styled.button`
  cursor: pointer;
  background-color: transparent;
  padding: 8px 20px;
  margin: 0;
  box-sizing: border-box;
  border: 1px solid #000;
  transition: 0.3s ease-in-out;
  font-size: 1rem;
  @media (hover: hover) {
    &:hover {
      color: #${(props) => props.textColor};
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export const TopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #7095f4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  z-index: 1000;
`;
