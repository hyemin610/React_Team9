import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { auth } from "../firebase";
import * as S from "../styles/style.home";
function Home() {
  const navigate = useNavigate();
  const [isTopVisible, setIsTopVisible] = useState(false); // "Top" 버튼 표시 여부 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태
  const handleWriteClick = () => {
    navigate("/create");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // 사용자 인증 상태 변화를 감지하여 로그인 상태 업데이트
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // 사용자가 로그인 상태인 경우 true, 아닌 경우 false
    });
    return () => unsubscribe(); // 컴포넌트가 언마운트될 때 observer 해제
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsTopVisible(true);
    } else {
      setIsTopVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useQuery("comments", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments`
    );
    return response.data;
  });
  // 핫게시글 선정 로직
  const getHotBalances = () => {
    if (!balances || !comments) {
      return []; // 데이터가 아직 로드되지 않았을 경우 빈 배열 반환
    }
    const balanceWithCommentCount = balances.map((balance) => {
      const commentCount = comments.filter(
        (comment) => comment.postId === balance.id
      ).length;
      return { ...balance, commentCount };
    });
    const hotBalances = balanceWithCommentCount
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 3);
    return hotBalances;
  };
  const hotBalances = getHotBalances();
  console.log(hotBalances);
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
      <S.BestBalanceTitle>
        <S.BestBalanceTitleSpan color="F47070">HOT</S.BestBalanceTitleSpan>
        <S.BestBalanceTitleSpan>게시글</S.BestBalanceTitleSpan>
      </S.BestBalanceTitle>
      <S.WriteButtonBox>
        {isLoggedIn && (
          <S.ButtonStyles onClick={handleWriteClick} textcolor="7095F4">
            작성
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
      {isTopVisible && <S.TopButton onClick={scrollToTop}>Top</S.TopButton>}
    </>
  );
}
export default Home;
