function counter() {
    let count = 0;

    function increase() {
        count++;
    }
    function printCount() {
        console.log(`count: ${count}`)
    }
    return {
        increase,
        printCount
    }
}

const countern = counter()
countern.increase()
countern.increase()
countern.increase()
countern.increase()
countern.printCount()

// 외부에서는 counter 함수 내의 count에 접근 불가
console.log(counter.count)