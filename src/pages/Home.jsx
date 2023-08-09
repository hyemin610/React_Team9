import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";

function Home() {
  const [balances, setBalances] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태
  const [isTopVisible, setIsTopVisible] = useState(false); // "Top" 버튼 표시 여부 상태

  React.useEffect(() => {
    async function fetchBalances() {
      try {
        const response = await axios.get("http://localhost:4000/balances");
        setBalances(response.data);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    }
    fetchBalances();

    // 인증 상태 변화를 감지하여 로그인 상태 업데이트
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 사용자가 로그인 상태인 경우 true, 아닌 경우 false
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 observer 해제
  }, []);

  const navigate = useNavigate();

  const goQuestion = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleWriteClick = () => {
    navigate("/create");
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsTopVisible(true);
    } else {
      setIsTopVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <BestBalanceTitle>
        <BestBalanceTitleSpan color="F47070">HOT</BestBalanceTitleSpan>
        <BestBalanceTitleSpan>게시글</BestBalanceTitleSpan>
      </BestBalanceTitle>
      <WriteButtonBox>
        {isLoggedIn && (
          <ButtonStyles onClick={handleWriteClick} textcolor="7095F4">
            작성
          </ButtonStyles>
        )}
      </WriteButtonBox>
      <div>
        <BalanceContainer>
          {balances.map((balance) => (
            <BalanceBox
              key={balance.id}
              onClick={() => goQuestion(balance.id)} // 수정된 부분
            >
              <BalanceTextBox textColor="ffd700">{balance.choice1}</BalanceTextBox>
              <BalanceTextBox>VS</BalanceTextBox>
              <BalanceTextBox textColor="008080">{balance.choice2}</BalanceTextBox>
            </BalanceBox>
          ))}
        </BalanceContainer>
      </div>
      {isTopVisible && <TopButton onClick={scrollToTop}>Top</TopButton>}
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

const TopButton = styled.button`
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
