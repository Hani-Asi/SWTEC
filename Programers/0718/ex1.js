// 명령형 프로그래밍 (어떻게 처리할 것인가)
// for문으로 값을 하나씩 계산해서 넣었다.
/*
function double(arr) {
    let results = []
    for(let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'number') {
            results.push(arr[i] * 2)
        }
    }
    return results
}
*/

// 선언형 프로그래밍 (무엇을 원하는가) 이쪽은 더 지향해야함
// 어떠한 과정을 거쳐서 만들 것인가
// 명령형보단 깔끔한 코딩이 나온다

function double(arr) {
    return arr.filter(param => typeof param === 'number')
              .map(number => number * 2)
}


document.querySelector('body').innerHTML = double([3, 4, 'a', 5, '', null, 11]);

// double([1, 2, 3]) => [2, 4, 6]