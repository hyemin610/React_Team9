import React, { useState } from "react";
import { useSelector } from "react-redux"; // useSelector 추가
import { nanoid } from "@reduxjs/toolkit";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateInputAndAlert } from "../redux/validationUtils";
import * as S from "../styles/style.create";

function Create() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const user = useSelector((state) => state.user.user);

  const addData = useMutation(
    async (newData) => {
      // axios를 사용하여 POST 요청을 보냄
      await axios.post("http://localhost:4000/balances", newData);
    },
    {
      onSuccess: () => {
        // 데이터 추가 성공 시, "balances" 쿼리를 다시 불러오기 위해 invalidateQueries 호출
        queryClient.invalidateQueries("balances");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const choice1 = e.target.choice1.value;
    const choice2 = e.target.choice2.value;

    if (validateInputAndAlert(title, content, choice1, choice2)) {
      return; // 유효성 검사 실패 시 중단
    }

    // let author;

    // if (isLoggedIn && user) {
    //   author = user.email || user.uid;
    // } else {
    //   author = "익명";
    // }

    const newData = {
      id: nanoid(),
      title: title,
      choice1: choice1,
      choice2: choice2,
      content: content,
    };

    // addData.mutate를 사용하여 새로운 데이터 추가 요청 보내기
    try {
      addData.mutate(newData);
      // 추가 후 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>토론 만들기</h1>

      <S.TitleInput name="title" placeholder="제목을 입력하세요" />

      <S.ChoiceContainer>
        <S.ChoiceInput name="choice1" placeholder="겨울" />
        <S.BoldSpan>vs</S.BoldSpan>
        <S.ChoiceInput name="choice2" placeholder="여름" />
      </S.ChoiceContainer>

      <S.ContentTextarea name="content" placeholder="내용을 입력하세요" />

      <S.CreateButton type="submit">만들기</S.CreateButton>
    </S.FormContainer>
  );
}

export default Create;
