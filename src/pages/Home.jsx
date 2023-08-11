import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { auth } from "../firebase";
import * as S from "../styles/style.home";

function Home() {
  // React Router의 네비게이션 훅을 사용하여 페이지 이동을 처리합니다.
  const navigate = useNavigate();
  // 스크롤 위치에 따라 "Top" 버튼 표시 여부를 관리하는 상태입니다.
  const [isTopVisible, setIsTopVisible] = useState(false);
  // 사용자 로그인 상태를 관리하는 상태입니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 글 작성 페이지로 이동하는 함수입니다.
  const handleWriteClick = () => {
    navigate("/create");
  };
  // 페이지 상단으로 부드럽게 스크롤하는 함수입니다.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // 스크롤 이벤트 리스너를 등록합니다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Firebase의 사용자 인증 상태를 감지하여 로그인 상태를 업데이트합니다.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 사용자가 로그인한 경우 true, 아닌 경우 false
    });
    // 컴포넌트가 언마운트될 때 Firebase 옵저버를 해제합니다.
    return () => {
      unsubscribe();
    };
  }, []);
  // 스크롤 위치에 따라 "Top" 버튼 표시 여부를 업데이트하는 함수입니다.
  const handleScroll = () => {
    setIsTopVisible(window.scrollY > 300);
  };
  // 서버에서 게시글 데이터를 가져오는 React Query 훅을 사용합니다.
  const {
    data: balances, // 게시글 데이터
    error, // 에러 객체
    isLoading, // 로딩 상태 여부
  } = useQuery("balances", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances`
    );
    return response.data;
  });
  // 서버에서 댓글 데이터를 가져오는 React Query 훅을 사용합니다.
  const { data: comments } = useQuery("comments", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments`
    );
    return response.data;
  });
  // 핫 게시글을 계산하고 필터링하여 가져오는 부분입니다.
  const hotBalances = React.useMemo(() => {
    if (!balances || !comments) return [];

    const balanceWithCommentCount = balances.map((balance) => ({
      ...balance,
      commentCount: comments.filter((comment) => comment.postId === balance.id)
        .length,
    }));
    // 댓글 수에 따라 게시글을 정렬하고 상위 3개를 선택합니다.
    return balanceWithCommentCount
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 3);
  }, [balances, comments]);
  // 게시글 상세 페이지로 이동하는 함수입니다.
  const goQuestion = (id) => {
    navigate(`/detail/${id}`);
  };
  // 로딩 중인 경우 로딩 표시를 보여줍니다.
  if (isLoading) return <div>Loading...</div>;
  // 에러가 발생한 경우 에러 메시지를 보여줍니다.
  if (error) return <div>Error fetching balances: {error.message}</div>;
  // 컴포넌트의 반환부분입니다.
  return (
    <>
      {/* 핫 게시글 타이틀 */}
      <S.BestBalanceTitle>
        <S.BestBalanceTitleSpan color="F47070">HOT</S.BestBalanceTitleSpan>
        <S.BestBalanceTitleSpan>게시글</S.BestBalanceTitleSpan>
      </S.BestBalanceTitle>
      {/* 글 작성 버튼 */}
      <S.WriteButtonBox>
        {isLoggedIn && (
          <S.ButtonStyles onClick={handleWriteClick} textcolor="7095F4">
            작성
          </S.ButtonStyles>
        )}
      </S.WriteButtonBox>
      <div>
        {/* 핫 게시글 목록 */}
        <S.BalanceContainer>
          {hotBalances.map((hotpost) => (
            <S.BalanceBox
              key={hotpost.id}
              onClick={() => goQuestion(hotpost.id)}
            >
              <S.BalanceTextBox textColor="ffd700">
                {hotpost.choice1}
              </S.BalanceTextBox>
              <S.BalanceTextBox>VS</S.BalanceTextBox>
              <S.BalanceTextBox textColor="008080">
                {hotpost.choice2}
              </S.BalanceTextBox>
            </S.BalanceBox>
          ))}
        </S.BalanceContainer>
        {/* 모든 게시글 목록 */}
        <S.BalanceContainer>
          모든 게시글 보기
          {balances.map((balance) => (
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
          ))}
        </S.BalanceContainer>
      </div>
      {/* "Top" 버튼 */}
      {isTopVisible && <S.TopButton onClick={scrollToTop}>Top</S.TopButton>}
    </>
  );
}
export default Home;
