import { styled } from "styled-components";

export const BalanceBox = styled.div`
  position: relative;
  width: 370px;
  height: 370px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transition: 0.3s ease-in-out;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      transform: translateY(-10px);
    }
  }
`;

export const BalanceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BalanceTextContainer = styled.div`
  position: absolute;
  bottom: 2;
  width: 100%;
  padding: 10px;
  color: white;
  text-align: center;
`;

export const BalanceTextBox = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
  text-align: center;
`;

export const BestBalanceTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto 0;
  font-size: 2rem;
`;

export const BestBalanceTitleSpan = styled.span`
  color: #ffffff;
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
  border: none;
  transition: 0.3s ease-in-out;
  @media (hover: hover) {
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }
`;

export const WriteButtonImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
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
