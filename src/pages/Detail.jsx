import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebase";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const userEmail = useSelector((state) => state.signup.userEmail);
  const displayName = useSelector((state) => state.signup.displayName);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(["comments", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/comments/${id}`
    );
    return response.data;
  });
  console.log(commentsData);

  const { data, isLoading, isError, error } = useQuery(
    ["balances", id],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
      );
      return response.data;
      console.log("balance");
    }
  );

  const deleteBalance = useMutation(
    async (balance) => {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/balances/${balance.id}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("balances");
        navigate("/");
      },
    }
  );

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

  // 유저 아이디가 같을 때 닉네임 보이기

  const handleEditClick = () => {
    navigate(`/edit/${data.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteBalance.mutate(data);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <p>{displayName}님의 논쟁입니다.</p>

        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{data?.title}</div>
        <div>상황:{data?.content}</div>
        <button>{data?.choice1}</button>
        <div>VS</div>
        <button>{data?.choice2}</button>
      </div>
      <button>다음 논쟁</button>
      <div>
        <span>댓글</span>
        {commentsData?.map((comment) => (
          <div key={comment.id}>{comment.comment}</div>
        ))}
      </div>
    </>
  );
}

export default Detail;
