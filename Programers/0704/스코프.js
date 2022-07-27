function counting() {
    let i = 0;
    for (i = 0; i < 5; i += 1) {
        setTimeout(function () {
            console.log(i);
        }, i * 100);
    }
}
counting();