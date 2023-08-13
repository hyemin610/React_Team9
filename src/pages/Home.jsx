import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { auth } from "../firebase";
import * as S from "../styles/style.home";

function Home() {
  const navigate = useNavigate();

  const [isTopVisible, setIsTopVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleWriteClick = () => {
    navigate("/create");
  };

  // 페이지 상단으로 부드럽게 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 스크롤 이벤트 리스너를 등록합니다.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Firebase의 사용자 인증 상태를 감지하여 로그인 상태를 업데이트
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 사용자가 로그인한 경우 true, 아닌 경우 false
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //"Top" 버튼
  const handleScroll = () => {
    setIsTopVisible(window.scrollY > 300);
  };

  // 서버에서 게시글 데이터를 가져오기
  const {
    data: balances,
    error,
    isLoading,
  } = useQuery("balances", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances`
    );
    return response.data;
  });

  const { data: comments } = useQuery("comments", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments`
    );
    return response.data;
  });

  // 핫 게시글을 계산하고 필터링
  const hotBalances = React.useMemo(() => {
    if (!balances || !comments) return [];

    const balanceWithCommentCount = balances.map((balance) => ({
      ...balance,
      commentCount: comments.filter((comment) => comment.postId === balance.id)
        .length,
    }));

    // 댓글 수에 따라 게시글을 정렬하고 상위 3개를 선택
    return balanceWithCommentCount
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 3);
  }, [balances, comments]);

  const goQuestion = (id) => {
    navigate(`/detail/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching balances: {error.message}</div>;

  return (
    <>
      {/* 핫 게시글 */}
      <S.BestBalanceTitle>
        <S.BestBalanceTitleSpan>Popularity</S.BestBalanceTitleSpan>
      </S.BestBalanceTitle>
      <S.WriteButtonBox>
        {isLoggedIn && (
          <S.ButtonStyles onClick={handleWriteClick}>
            <S.WriteButtonImage src="/image/pencil.png" alt="Pencil Image" />
          </S.ButtonStyles>
        )}
      </S.WriteButtonBox>
      <div>
        <S.BalanceContainer>
          {hotBalances.map((hotpost) => (
            <S.BalanceBox
              key={hotpost.id}
              onClick={() => goQuestion(hotpost.id)}
            >
              <S.BalanceImage src="/image/box.png" alt="Box Image" />
              <S.BalanceTextContainer>
                <S.BalanceTextBox textColor="000000">
                  {hotpost.title}
                </S.BalanceTextBox>
              </S.BalanceTextContainer>
            </S.BalanceBox>
          ))}
        </S.BalanceContainer>
        {/* 모든 게시글*/}
        <S.BestBalanceTitle>
          <S.BestBalanceTitleSpan>
            <S.ViewAllPost>모든 게시글</S.ViewAllPost>
          </S.BestBalanceTitleSpan>
        </S.BestBalanceTitle>
        <S.BalanceContainer>
          {balances.map((balance) => (
            <S.BalanceBox
              key={balance.id}
              onClick={() => goQuestion(balance.id)}
            >
              <S.BalanceImage src="/image/box.png" alt="Box Image" />
              <S.BalanceTextContainer>
                <S.BalanceTextBox textColor="000000">
                  {balance.title}
                </S.BalanceTextBox>
              </S.BalanceTextContainer>
            </S.BalanceBox>
          ))}
        </S.BalanceContainer>
      </div>
      {/* "Top" 버튼 */}
      {isTopVisible && <S.TopButton onClick={scrollToTop}>TOP</S.TopButton>}
    </>
  );
}
export default Home;
