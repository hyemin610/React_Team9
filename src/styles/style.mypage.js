import { styled } from "styled-components";

export const Nickname = styled.div`
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: left;
  margin: 50px auto 100px 2px;
  text-decoration: underline;
  color: white;
`;
export const BalanceTextBox = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
`;

// 파일 이미지
export const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
`;

export const BalanceBox = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
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

export const BalanceText = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
  text-align: center;
`;

export const Comment = styled.div`
  font-size: 40px;
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
`;
