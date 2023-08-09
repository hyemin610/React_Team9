export function validateInputAndAlert(title, content, choice1, choice2) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "제목을 입력하세요.";
  }
  if (!content.trim()) {
    errors.content = "내용을 입력하세요.";
  }
  if (!choice1.trim() || !choice2.trim()) {
    errors.choice1 = "토론 주제를 입력하세요.";
  }

  if (Object.keys(errors).length > 0) {
    const errorMessages = Object.values(errors);
    alert(errorMessages.join("\n"));
    return true; // 유효성 검사 실패
  }

  return false; // 유효성 검사 성공
}
