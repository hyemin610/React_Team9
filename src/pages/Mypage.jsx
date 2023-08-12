import * as S from "../styles/style.mypage";
import * as A from "../styles/style.home";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
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
          <S.Nickname>{displayName}님의 게시글</S.Nickname>
        </div>
        {/* <div> */}
        <S.BalanceContainer>
          {findId && findId.length > 0 ? (
            findId.map((balance) => (
              <S.BalanceBox
                key={balance.id}
                onClick={() => goQuestion(balance.id)}
              >
                <S.BalanceImage src="/image/box.png" alt="Box Image" />
                <S.BalanceTextContainer>
                  <S.BalanceText textColor="000000">
                    {balance.title}
                  </S.BalanceText>
                </S.BalanceTextContainer>
                {/* <S.BalanceTextBox textColor="ffd700">
                  {balance.choice1}
                </S.BalanceTextBox>
                <S.BalanceTextBox>VS</S.BalanceTextBox>
                <S.BalanceTextBox textColor="008080">
                  {balance.choice2}
                </S.BalanceTextBox> */}
              </S.BalanceBox>
            ))
          ) : (
            <S.Comment>
              아직 작성한 게시물이 없어용!!!
              <br />
              작성해볼까요??
            </S.Comment>
          )}
          {/* </div> */}
        </S.BalanceContainer>
      </S.Allpage>
    </>
  );
}
