const message = "안녕하세요. 010-1234-5678로 연락주세요.";
const message2 = "안녕하세요. 연락하지 마세요.";

const regExp = /\d{3}-d{3,4}-d{4}/;
console.log(regExp.test(message));
console.log(RegExp.test(message2));