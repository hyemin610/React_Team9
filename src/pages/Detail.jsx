import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";

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
        navigate("/");
      },
    }
  );

  const [voteChoice, setVoteChoice] = useState(null);

  const handleVoteClick = async (choice) => {
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

        queryClient.invalidateQueries(["balances", id]);
        localStorage.setItem(id, choice);
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
      deleteBalance.mutate(data.id);
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

  return (
    <>
      <div style={{ display: "flex" }}>
        {displayName === data.author ? (
          <div>
            <p>{data?.author}님의 논쟁입니다.</p>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        ) : (
          <p>{data?.author}님의 논쟁입니다.</p>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div>{data.title}</div>
        <div>상황: {data.comment}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => handleVoteClick("choice1")}
            disabled={voteChoice === "choice1" || voteChoice === "choice2"}
          >
            {data.choice1}
          </button>
          <button
            onClick={() => handleVoteClick("choice2")}
            disabled={voteChoice === "choice1" || voteChoice === "choice2"}
          >
            {data.choice2}
          </button>
        </div>
        <div>VS</div>
        <div>{data.content}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            {data.choice1}: {choice1Percentage.toFixed(2)}%
            <div
              style={{
                width: `${choice1Percentage}%`,
                background: "blue",
                height: "20px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            {data.choice2}: {choice2Percentage.toFixed(2)}%
            <div
              style={{
                width: `${choice2Percentage}%`,
                background: "red",
                height: "20px",
              }}
            />
          </div>
        </div>
      </div>
      <button>다음 논쟁</button>
      <Comment postId={data?.id} commentsData={commentsData} />
    </>
  );
}

export default Detail;
