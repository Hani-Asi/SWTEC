const mes = "()()";
const mes1 = "(())()";
const mes2 = ")()(";
const mes3 = "(()(";

const regExp = /^\(+/;
function solution(s){
    if(mes.length%2 == 0) {
        if(mes.match(regExp).length > 0) {
            var answer = true;
        } else {
            var answer = false;
        }
    } else {
        var answer = false;
    }
    return answer;
}

console.log(solution());