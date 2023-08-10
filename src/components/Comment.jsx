import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as S from "../styles/style.create";
import { useSelector } from "react-redux";

function Comment({ postId, commentsData }) {
  const queryClient = useQueryClient();

  const displayName = useSelector((state) => state.signup.displayName);

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
      author: displayName,
      date: new Date().toISOString(),
    };

    try {
      await addData.mutateAsync(newData);
      commentInput.value = ""; //입력시 댓글 폼 초기화
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const findId = commentsData?.filter((newData) => newData?.postId === postId);

  const elapsedTime = (date) => {
    const start = new Date(date);
    const end = new Date();

    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return "방금 전";

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    return `${start.toLocaleDateString()}`;
  };

  return (
    <div>
      <span>댓글</span>
      <form onSubmit={handleSubmit}>
        <S.TitleInput name="comment" placeholder="댓글을 작성해주세요." />
        <button type="submit">작성</button>
        {findId && findId.length > 0 ? (
          findId.map((comment) => (
            <div key={comment.commentId}>
              <span>{comment.author}님</span>&nbsp;
              <span>{elapsedTime(comment.date)}</span>
              <div>{comment.comment}</div>
            </div>
          ))
        ) : (
          <div>아직 댓글이 없어요. 작성해볼까요?</div>
        )}
      </form>
    </div>
  );
}

export default Comment;
