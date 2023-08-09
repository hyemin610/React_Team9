import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate("/create");
  };

  const {
    data: balances,
    error,
    isLoading,
  } = useQuery("balances", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances`
    );
    console.log(response);
    return response.data;
  });

  const goQuestion = (id) => {
    navigate(`/detail/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching balances: {error.message}</div>;
  }

  return (
    <>
      <BestBalanceTitle>
        <BestBalanceTitleSpan color="F47070">HOT</BestBalanceTitleSpan>
        <BestBalanceTitleSpan>게시글</BestBalanceTitleSpan>
      </BestBalanceTitle>
      <WriteButtonBox>
        <ButtonStyles onClick={handleWriteClick} textcolor="7095F4">
          작성
        </ButtonStyles>
      </WriteButtonBox>
      <div>
        <BalanceContainer>
          {balances.map((balance) => (
            <BalanceBox key={balance.id} onClick={() => goQuestion(balance.id)}>
              <BalanceTextBox textColor="ffd700">
                {balance.choice1}
              </BalanceTextBox>
              <BalanceTextBox>VS</BalanceTextBox>
              <BalanceTextBox textColor="008080">
                {balance.choice2}
              </BalanceTextBox>
            </BalanceBox>
          ))}
        </BalanceContainer>
      </div>
    </>
  );
}

export default Home;
const BalanceBox = styled.div`
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

const BalanceTextBox = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
`;
const BestBalanceTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto 0;
  font-size: 2rem;
`;

const BestBalanceTitleSpan = styled.span`
  color: ${(props) => (props.color === "F47070" ? "#ff0000" : "#7095F4")};
  margin-right: 5px;
`;

const WriteButtonBox = styled.div`
  width: 33.333%;
  display: flex;
  margin-left: auto;
`;

const ButtonStyles = styled.button`
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

const BalanceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;
