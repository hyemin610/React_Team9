import React, { useState } from "react";
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
      id: nanoid(),
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

  // 게시글의 댓글 가져오기
  const findId = commentsData?.filter((newData) => newData?.postId === postId);

  // 실시간 댓글
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
      </form>
      {findId && findId.length > 0 ? (
        findId.map((comment) => (
          <div key={comment.id}>
            <span>{comment.author}님</span>&nbsp;
            <span>{elapsedTime(comment.date)}</span>
            {/* 댓글 수정 폼 또는 댓글 내용 표시 */}
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(comment.commentId)}>
                  저장
                </button>
              </div>
            ) : (
              <div>
                {comment.comment}
                {/* 수정 버튼 */}
                {displayName === comment.author && (
                  <div>
                    <button
                      onClick={() =>
                        handleEditComment(comment.id, comment.comment)
                      }
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("삭제하시겠습니까?")) {
                          handleDeleteComment(comment.id);
                        }
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div>아직 댓글이 없어요. 작성해볼까요?</div>
      )}
    </div>
  );
}
export default Comment;
