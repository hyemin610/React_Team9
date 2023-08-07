import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px",
          backgroundColor: "#000000",
          color: "white",
        }}
      >
        <div>로고</div>
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <div>로그인</div>
          <div>회원가입</div>
        </div>
      </header>
      {/* header와 footer 사이에 넣어줍니다. */}
      <Outlet />
      {/* footer */}
      <footer
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          padding: "24px",
          backgroundColor: "#EEEEEE",
          color: "black",
        }}
      >
        <div>문의하기</div>
        <div>SNS 채널들</div>
      </footer>
    </>
  );
}
