const numbers = [0, 1, 2, 3, 4]

for(var i = 0; i < numbers.length; i++) {
}

setTimeout(function() {
    for(var i = 0; i < numbers.length; i++) {
        console.log(`[${i+1}] number ${numbers[i]} turn!`)
    }
}, i * 1000)

