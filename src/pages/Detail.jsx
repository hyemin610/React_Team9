import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";
import * as S from "../styles/style.detail";
import { VoteButton } from "../styles/style.detail";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const displayName = useSelector((state) => state.signup.displayName);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(["comments", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments`
    );
    return response.data;
  });

  const voteQuery = useQuery(["vote", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/vote`
    );

    const findPostId = response.data?.filter((data) => data?.postId === id);

    console.log(findPostId);
    return response.data;
  });

  const { data, isLoading, isError } = useQuery(["balances", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
    );
    return response.data;
  });

  const deleteBalance = useMutation(
    async (balanceId) => {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/balances/${balanceId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
        navigate("/home");
      },
    }
  );

  const [voteChoice, setVoteChoice] = useState(null);

  const handleVoteClick = async (choice) => {
    if (!displayName) {
      // 접속한 계정이 없으면 여기서 처리
      alert("로그인이 필요합니다."); // 로그인 필요 알림 띄우기
      navigate("/login");
      return;
    }

    if (voteChoice !== choice) {
      setVoteChoice(choice);

      const updatedData = {
        ...data,
        vote1: choice === "choice1" ? data.vote1 + 1 : data.vote1,
        vote2: choice === "choice2" ? data.vote2 + 1 : data.vote2,
      };

      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER_URL}/balances/${id}`,
          updatedData
        );

        // 저장된 투표 데이터를 서버로 전송
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/vote`, {
          postId: id,
          userId: displayName,
          choice: choice,
        });

        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error("Error updating vote:", error);
      }
    }
  };

  const handleEditClick = () => {
    navigate(`/edit/${data.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteBalance.mutate(data.id, {
        // 뮤테이션 성공 시 실행할 콜백 함수
        onSuccess: () => {
          // "balances" 쿼리를 다시 가져와서 데이터 업데이트
          queryClient.getQueryByKey("balances").refetch();
          navigate("/home");
        },
      });
    }
  };

  if (isLoading || isCommentsLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isCommentsError) {
    return (
      <div>
        {isError && <div>Error loading post data</div>}
        {isCommentsError && <div>Error loading comments data</div>}
      </div>
    );
  }

  if (!data) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const totalVotes = data.vote1 + data.vote2;
  const choice1Percentage =
    totalVotes === 0 ? 0 : (data.vote1 / totalVotes) * 100;
  const choice2Percentage =
    totalVotes === 0 ? 0 : (data.vote2 / totalVotes) * 100;

  const findPostId = voteQuery.data?.filter(
    (data) => data?.postId === id && data?.userId === displayName
  );

  return (
    <S.DetailContainer>
      <div>
        {displayName === data?.author ? (
          <div style={{ borderRadius: " 5px", borderColor: "white" }}>
            <S.AuthorDebate>{data.author}님의 논쟁입니다.</S.AuthorDebate>
            <S.Button onClick={handleEditClick}>수정</S.Button>
            <S.Button onClick={handleDeleteClick}>삭제</S.Button>
          </div>
        ) : (
          <S.AuthorDebate>{data?.author}님의 논쟁입니다.</S.AuthorDebate>
        )}
      </div>
      <S.PostTitle>{data.title}</S.PostTitle>
      <div>
        <S.PostContent>
          상황:
          <div>{data.content}</div>
        </S.PostContent>
        <S.VoteResult>
          <S.Vote style={{ display: "flex", flexDirection: "column" }}>
            <S.VoteButton
              onClick={() => handleVoteClick("choice1")}
              disabled={
                voteChoice === "choice1" ||
                voteChoice === "choice2" ||
                findPostId?.some((data) => data.userId === displayName)
              }
            >
              {data.choice1}
            </S.VoteButton>
            <S.VoteButton2
              onClick={() => handleVoteClick("choice2")}
              disabled={
                voteChoice === "choice1" ||
                voteChoice === "choice2" ||
                findPostId?.some((data) => data.userId === displayName)
              }
            >
              {data.choice2}
            </S.VoteButton2>
          </S.Vote>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <S.VotePercent>{choice1Percentage.toFixed(2)}%</S.VotePercent>
              <div
                style={{
                  width: `${choice1Percentage}%`,
                  background: "white",
                  height: "20px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <S.VotePercent>{choice2Percentage.toFixed(2)}%</S.VotePercent>

              <div
                style={{
                  width: `${choice2Percentage}%`,
                  background: "black",
                  height: "20px",
                }}
              />
            </div>
          </div>
        </S.VoteResult>
      </div>
      <S.CommentDiv>
        <hr />
        <Comment postId={data?.id} commentsData={commentsData} />
      </S.CommentDiv>
    </S.DetailContainer>
  );
}

export default Detail;
