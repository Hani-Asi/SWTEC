/*
   initialState: [
      {
         id: 1,
         imagePath: ''
      }
   ]
*/

export default function PhotoList({ $target, initialState, onScrollEnded }) {
   let isInitialize = false

   const $photoList = document.createElement('div')
   $target.appendChild($photoList)
   this.state = initialState

   const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting && !this.state.isLoading) {
            console.log('화면 끝', entry)
            onScrollEnded()
         }
      })
   }, {
      threshold: 0.5 
   })

   let $lastLi = null

   this.setState = nextState => {
      this.state = nextState
      this.render()
   }

   this.render = () => {
      if (!isInitialize) {
         $photoList.innerHTML = `
            <ul class="PhotoList_photos"></ul>
         `
         isInitialize = true
      }
      const { photos } = this.state
      const $photos = $photoList.querySelector('.PhotoList_photos')

      photos.forEach(photo => {
         // photo의 id 기준으로 렌더링이 되어있는지 체크
         if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
            // 없으면 li 생성하고 $photo에 appendChild
            const $li = document.createElement('li')
            $li.setAttribute('data-id', photo.id)
            $li.style = 'list-style: none; min-heigh: 500px;'
            $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`

            $photos.appendChild($li)
         }
      })

      const $nextLi = $photos.querySelector('li:last-child')

      if($nextLi !== null) {
         if ($lastLi !== null) {
            observer.unobserve($lastLi)
         }

         $lastLi = $nextLi
         observer.observe($lastLi)
      }
   }

   this.render()
}
   /*
   $photoList.addEventListener('click', e => {
      if (e.target.className === 'PhotoList_loadMore' && !this.state.isLoading) {
         onScrollEnded()
      } 
   })
   무한 스크롤의 단점인 푸터에 접근을 못한다는 것인데 그것을 방지하기 위해 버튼을 만들어둬서 
   더보기 버튼을 클릭하면 다음 스크롤 되는 걸로 만들기도 한다
   

   window.addEventListener('scroll', () => {
      const { isLoading, totalCount, photos } = this.state
      const isScrollEnded = (window.innerHeight + window.scrollY) + 100 >= document.body.offsetHeight
      // 위 코드는 스크롤이 맨 아래로 내려지면 true로 출력하는 코드 
      // +100을 하면 맨 밑은 아니고 맨 밑에서 좀 위로 내려지면 true
      // 이렇게 + 100정도를 하면 스크롤이 다 내려갈 때 쯤에 새로 불러와서 하나로 이어진 것처럼 보인다

      if (isScrollEnded && !isLoading && photos.length < totalCount) {
         onScrollEnded()
      }
      // 
   })
   */

