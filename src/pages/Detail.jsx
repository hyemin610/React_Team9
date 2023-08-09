import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as S from "../styles/style.create";
import { nanoid } from "@reduxjs/toolkit";

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

  const addData = useMutation(
    async (newData) => {
      // axios를 사용하여 POST 요청을 보냄
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newData);
    },
    {
      onSuccess: () => {
        // 데이터 추가 성공 시, "balances" 쿼리를 다시 불러오기 위해 invalidateQueries 호출
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const { data, isLoading, isError } = useQuery(["balances", id], async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/balances/${id}`
    );
    return response.data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (comment === "") {
      alert("댓글을 입력해주세요");
    }

    const newData = {
      commentId: nanoid(),
      postId: data?.id,
      comment: comment,
    };

    try {
      addData.mutate(newData);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };
  const findId = commentsData?.filter(
    (newData) => newData?.postId === data?.id
  );
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

  const handleEditClick = () => {
    navigate(`/edit/${data.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteBalance.mutate(data.id);
    }
  };

  return (
    <>
      <detailHeader style={{ display: "flex" }}>
        {displayName === data.author ? (
          <div>
            <p>{data?.author}님의 논쟁입니다.</p>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        ) : (
          <p>{data?.author}님의 논쟁입니다.</p>
        )}
      </detailHeader>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>{data.title}</div>
        <div>상황:{data.comment}</div>
        <button>{data.choice1}</button>
        <div>VS</div>
        <button>{data.choice2}</button>
      </div>
      <button>다음 논쟁</button>
      <div>
        <span>댓글</span>
        <form onSubmit={handleSubmit}>
          <S.TitleInput name="comment" placeholder="댓글을 작성해주세요." />
          <button type="submit">작성</button>
          {findId.map((comment) => (
            <div key={comment.commentId}>{comment.comment}</div>
          ))}
        </form>
      </div>
    </>
  );
}

export default Detail;
