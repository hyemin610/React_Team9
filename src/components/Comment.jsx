import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as S from "../styles/style.create";

function Comment({ postId, commentsData }) {
  const queryClient = useQueryClient();

  const addData = useMutation(
    async (newData) => {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentInput = e.target.comment;
    const comment = commentInput.value;

    if (comment === "") {
      alert("댓글을 입력해주세요");
      return;
    }

    const newData = {
      commentId: nanoid(),
      postId: postId,
      comment: comment,
    };

    try {
      await addData.mutateAsync(newData);
      commentInput.value = ""; //입력시 댓글 폼 초기화
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const findId = commentsData?.filter((newData) => newData?.postId === postId);

  return (
    <div>
      <span>댓글</span>
      <form onSubmit={handleSubmit}>
        <S.TitleInput name="comment" placeholder="댓글을 작성해주세요." />
        <button type="submit">작성</button>
        {findId && findId.length > 0 ? (
          findId.map((comment) => (
            <div key={comment.commentId}>{comment.comment}</div>
          ))
        ) : (
          <div>아직 댓글이 없어요. 작성해볼까요?</div>
        )}
      </form>
    </div>
  );
}

export default Comment;
