import React from "react";

function Create() {
  return (
    <form
      style={{
        width: "80%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>토론 만들기</h1>

      <input
        name="title"
        placeholder="제목을 입력하세요"
        style={{
          width: "80%",
          height: "50px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid lightgrey",
          padding: "4px",
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          name="input1"
          placeholder="겨울"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid lightgrey",
            padding: "4px",
            boxSizing: "border-box",
          }}
        />
        <span style={{ margin: "0 10px", fontSize: "18px", fontWeight: "bold" }}>vs</span>
        <input
          name="input2"
          placeholder="여름"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid lightgrey",
            padding: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
      <textarea
        name="content"
        placeholder="내용을 입력하세요"
        style={{
          resize: "none",
          width: "80%",
          height: "40%",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid lightgrey",
          padding: "8px",
          boxSizing: "border-box",
        }}
      />

      <button
        style={{
          width: "10%",
          height: "40px",
          border: "none",
          color: "white",
          borderRadius: "8px",
          backgroundColor: "skyblue",
          cursor: "pointer",
          fontSize: "16px",
        }}
        type="submit"
      >
        만들기
      </button>
    </form>
  );
}

export default Create;
