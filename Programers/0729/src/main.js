import PostEditPage from "./PostEditPage.js"

const $target = document.querySelector('#app')

// new App({ $target })

const postEditPage = new PostEditPage({
   $target,
   initialState: {
      postID: 'new'
   }
})

postEditPage.setState({
   postID: 2
})