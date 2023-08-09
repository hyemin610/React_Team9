import * as S from "../styles/style.home";
import * as St from "../styles/style.mypage";

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
  //로그인한 작성자의 게시글 불러오기
  const findId = balances?.filter((newData) => newData?.author === displayName);
  // console.log(findId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching balances: {error.message}</div>;
  }

  return (
    <>
      <St.Allpage>
        <div>
          <St.Profile>프로필사진</St.Profile>
          <St.Nickname>{displayName}</St.Nickname>
        </div>
        <div>
          {findId && findId.length > 0 ? (
            findId.map((balance) => (
              <S.BalanceBox
                key={balance.id}
                onClick={() => goQuestion(balance.id)}
              >
                <S.BalanceTextBox textColor="ffd700">
                  {balance.choice1}
                </S.BalanceTextBox>
                <S.BalanceTextBox>VS</S.BalanceTextBox>
                <S.BalanceTextBox textColor="008080">
                  {balance.choice2}
                </S.BalanceTextBox>
              </S.BalanceBox>
            ))
          ) : (
            <div>아직 작성한 게시물이 없어용~작성해볼까요??</div>
          )}
        </div>
      </St.Allpage>
    </>
  );
}
