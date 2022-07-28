
API 사용법

--------------------------------------------------------------

데이터 형태
javascript
{
   "_id" : 할 일의 고유값, 숫자와 문자가 섞여있는 문자로 되어있다
   "constent" : 할 일 text
   "isCompleted" : 할 일의 완료부여
}

--------------------------------------------------------------

할 일 목록 불러오기

 - API url : https://kdt-api.roto.codes/:username

 > 모든 API에는 `username`이 들어가게 되어있다. 본인의 `username`을 적당히 넣으면 된다.

 @ 예시
 {
   fetch('https://kdt-api.roto.codes/:username').then()...
 }