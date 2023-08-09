import * as S from "../styles/style.mypage";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  //닉네임 불러오기
  const displayName = useSelector((state) => state.signup.displayName);
  //post 모두 불러오기
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

  const navigate = useNavigate();
  const goQuestion = (id) => {
    navigate(`/detail/${id}`);
  };

  const findId = balances?.filter((newData) => newData?.author === displayName);
  console.log(findId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching balances: {error.message}</div>;
  }

  return (
    <>
      <S.Allpage>
        <div>
          <S.Profile>프로필사진</S.Profile>
          <S.Nickname>{displayName}</S.Nickname>
        </div>
        <div>
          {/* <S.Content>내용 불러오기</S.Content> */}
          {/* if({displayName}=== {balances.author}) */}
          {findId && findId.length > 0 ? (
            findId.map((balance) => (
              <BalanceBox
                key={balance.id}
                onClick={() => goQuestion(balance.id)}
              >
                <BalanceTextBox textColor="ffd700">
                  {balance.choice1}
                </BalanceTextBox>
                <BalanceTextBox>VS</BalanceTextBox>
                <BalanceTextBox textColor="008080">
                  {balance.choice2}
                </BalanceTextBox>
              </BalanceBox>
            ))
          ) : (
            <div>아직 작성한 게시물이 없어용~작성해볼까요??</div>
          )}
        </div>
      </S.Allpage>
    </>
  );
}

const BalanceTextBox = styled.div`
  margin: 15px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #${(props) => props.textColor};
`;
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
