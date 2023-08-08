import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const balances = [
    { id: 1, text: "Balance 1" },
    { id: 2, text: "Balance 2" },
    { id: 3, text: "Balance 3" },
    // ... 더 많은 밸런스 데이터를 추가할 수 있습니다.
  ];

  const navigate = useNavigate();
  const goBalance = (id) => {
    navigate(`/detail/${id}`); // 여기서 id를 올바르게 전달
  };

  const handleWriteClick = () => {
    // 작성하기 버튼을 클릭했을 때 "/create" 페이지로 이동
    navigate("/create");
  };

  return (
    <>
      <BestBalanceTitle>
        <BestBalanceTitleSpan color="F47070">HOT</BestBalanceTitleSpan>
        <BestBalanceTitleSpan>게시글</BestBalanceTitleSpan>
      </BestBalanceTitle>
      <WriteButtonBox>
        <ButtonStyles onClick={handleWriteClick} textColor="7095F4">
          작성하기
        </ButtonStyles>
      </WriteButtonBox>
      <div>
        <BalanceContainer>
          {balances.map((balance) => (
            <BalanceBox key={balance.id} onClick={() => goBalance(balance.id)}>
              <div>{balance.text}</div>
            </BalanceBox>
          ))}
        </BalanceContainer>
        <Separator />
        <BalanceContainer>
          {balances.map((balance) => (
            <BalanceBox key={balance.id} onClick={() => goBalance(balance.id)}>
              <div>{balance.text}</div>
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

// 버튼 스타일 컴포넌트를 정의하여 스타일링
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
  flex-wrap: wrap; /* 너비 초과 시 다음 줄로 내려감 */
  justify-content: center; /* 가로 정렬 중앙 정렬 */
  align-items: flex-start; /* 세로 정렬 위쪽 정렬 */
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #000;
  margin: 20px 0;
`;
