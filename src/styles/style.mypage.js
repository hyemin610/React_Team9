import { styled } from "styled-components";

export const Allpage = styled.div``;

export const Nickname = styled.div`
  font-weight: bold;
  font-size: 30px;
  width: 350px;
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

export const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-left: auto;
`;

export const BalanceBox = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  transition: 0.3s ease-in-out;
  border: 1px solid white;
  border-radius: 10px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      transform: translateY(-10px);
    }
  }
`;

export const Comment = styled.div`
  font-size: 40px;
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 40%; */
`;
