const data = [
    {
        name: '나나',
        colors: ['yellow', 'white'],
        age: 7,
        ear: 'unfolded'
    },
    {
        name: '차이',
        colors: ['yellow', 'white', 'brown'],
        age: 3,
        ear: 'unfolded'
    },
    {
        name: '모나',
        colors: ['black', 'white'],
        age: 2,
        ear: 'unfolded'
    },
    {
        name: '레이',
        colors: ['grey', 'white'],
        age: 7,
        ear: 'unfolded'
    },
    {
        name: '나나',
        colors: ['gray', 'black'],
        age: 10,
        ear: 'folded'
    },
    null
]

// 털 색이 까만색이 포함되어 있으면서
// 귀가 접혀있지 않은 고양이들을 뽑기

// 명령형
/*
function filterCats(cats) {
    let results = []

    for(let i = 0; i < cats.length; i++) {
        const cat = cats[i]
        if(cat && 
           cat.colors.includes('brown') && 
           cat.ear === 'unfolded') {
            results.push(cat.name)
        }
    }
    return results
}
const filterCatsName = filterCats(data)
console.log(filterCatsName)
document.querySelector('body').innerHTML = filterCatsName
*/

//선언형

function filterCats(cats, color) {
    return cats.filter(cat => cat && 
           cat.colors.includes('black') && 
           cat.ear === 'unfolded'
           ).map(cat => cat.name)
}
const filterCatsName = filterCats(data, 'black')
console.log(filterCatsName)
document.querySelector('body').innerHTML = filterCatsName