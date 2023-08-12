import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as S from "../styles/style.create";
// import * as S from "../styles/style.comments";
import {
  addComment,
  updateComment,
  deleteComment,
} from "../redux/modules/commentsSlice";
import { useNavigate } from "react-router-dom";

function Comment({ postId, commentsData }) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayName = useSelector((state) => state.signup.displayName);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const addCommentMutation = useMutation(
    async (newComment) => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/comments`,
        newComment
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const updateCommentMutation = useMutation(
    async (updatedComment) => {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/comments/${updatedComment.id}`,
        updatedComment
      );
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
    const newComment = {
      id: nanoid(),
      postId: postId,
      comment: comment,
      author: displayName,
      date: new Date().toISOString(),
    };
    try {
      await addCommentMutation.mutateAsync(newComment);
      commentInput.value = ""; //입력시 댓글 폼 초기화
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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

    try {
      const updatedComment = {
        id: commentId,
        postId: postId,
        comment: editedComment,
        author: displayName,
        date: new Date().toISOString(),
      };

      await updateCommentMutation.mutateAsync(updatedComment);

      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`
      );

      // 리덕스를 활용하여 댓글 삭제
      dispatch(deleteComment({ id: commentId }));

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

  // 해당 게시글의 댓글 가져오기
  const filteredComments = commentsData.filter(
    (comment) => comment?.postId === postId
  );

  return (
    <div>
      <>
        <S.CommentTitle>댓글</S.CommentTitle>
        <form onSubmit={handleSubmit}>
          <S.TitleInput name="comment" placeholder="댓글을 작성해주세요." />
          <S.Button type="submit">작성</S.Button>
        </form>
      </>
      <S.Box>
        <S.ScrollBox>
          {filteredComments && filteredComments.length > 0 ? (
            filteredComments?.map((comment) => (
              <S.CommentBox key={comment.id}>
                <div>
                  <S.AuthorNickname>{comment.author}님</S.AuthorNickname>&nbsp;
                  <span>{elapsedTime(comment.date)}</span>
                  {/* 수정 버튼 */}
                  {displayName === comment.author && (
                    <div>
                      <S.Button
                        onClick={() =>
                          handleEditComment(comment.id, comment.comment)
                        }
                      >
                        수정
                      </S.Button>
                      <S.Button
                        onClick={() => {
                          if (window.confirm("삭제하시겠습니까?")) {
                            handleDeleteComment(comment.id);
                          }
                        }}
                      >
                        삭제
                      </S.Button>
                    </div>
                  )}
                </div>
                <hr />
                {/* 댓글 수정 폼 또는 댓글 내용 표시 */}
                {editingCommentId === comment.id ? (
                  <div>
                    {/* <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} /> */}

                    <S.CommentEdit
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <S.Button onClick={() => handleSaveEdit(comment.id)}>
                      저장
                    </S.Button>
                  </div>
                ) : (
                  <S.CommentText>{comment.comment}</S.CommentText>
                )}
              </S.CommentBox>
            ))
          ) : (
            <div>아직 댓글이 없어요. 작성해볼까요?</div>
          )}
        </S.ScrollBox>
      </S.Box>
    </div>
  );
}
export default Comment;
