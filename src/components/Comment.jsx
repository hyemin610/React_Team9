import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as S from "../styles/style.create";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Comment({ postId, commentsData }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const displayName = useSelector((state) => state.signup.displayName);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

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

  // 작성 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentInput = e.target.comment;
    const comment = commentInput.value;
    if (!displayName) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }
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
  // 댓글 수정
  const handleEditComment = (id, currentComment) => {
    setEditingCommentId(id);
    setEditedComment(currentComment);
  };
  // 수정된 댓글을 저장하는 함수
  const handleSaveEdit = async (commentId) => {
    if (editedComment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    // 서버에 수정된 댓글 정보 보내기
    try {
      const updatedComment = {
        postId: postId,
        id: commentId,
        comment: editedComment,
        author: displayName,
        date: new Date().toISOString(), // 수정된 내용
      };

      // 서버에 수정된 댓글 정보 보내기
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`,
        updatedComment
      );

      // 서버에 수정된 댓글 정보를 보낸 후 서버로부터 새로운 데이터 받아오기
      const updatedCommentsData = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments`
      );

      // Query 갱신
      queryClient.invalidateQueries("comments", updatedCommentsData.data);
      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    // 서버에서 해당 댓글 삭제 요청 보내기
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`
      );
      // Query 갱신
      queryClient.invalidateQueries("comments");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
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

                <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
              </div>
            ) : (
              <div>
                {comment.comment}
                {/* 수정 버튼 */}
                {displayName === comment.author && (
                  <>
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
                  </>
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
