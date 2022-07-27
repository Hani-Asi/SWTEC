function solution(num) {
    let arr1 = [];
    let arr2 = [];

    while (num.length !== 0) {
        if (num[0] === num[1]) {
            arr2.push(num[0]);
            num = num.replace(num[0], "");
        } else {
            arr2.push(num[0]);
            num = num.replace(num[0], "");
            arr1. push(arr2);
            arr2 = [];
        }
    }
    
    let answer = "";
    arr1.forEach(val => {
        answer += `${val[0]}${val.length}`;
    });
}

function ant(n) {
    if (n === 1) return "1";

    return solution(ant(n - 1));
}

console.log(ant(20));
