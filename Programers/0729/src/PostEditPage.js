import { request } from "./api.js"
import Editor from "./Editor.js"
import { getItem, removeItem, setItem } from "./storage.js"

export default function PostEditPage({ $target, initialState }) {
   const $page = document.createElement('div')

   this.state = initialState

   let postLocalSaveKey = `temp-post-${this.state.postID}`

   const post = getItem(postLocalSaveKey, {
      title: '',
      constent: ''
   })

   let timer = null

   const editor = new Editor({ 
      $target: $page, 
      initialState: post,
      onEditing: (post) => {
         if (timer !== null) {
            clearTimeout(timer)
         }
         timer = setTimeout(async() => {
            setItem(postLocalSaveKey, {
               ...post,
               tempSaveDate: new Date()
            })

            const isNew = this.state.postID === 'new'
            if (isNew) {
               const createdPost = await request('/posts', {
                  method: 'POST',
                  body: JSON.stringify(post)
               })
               history.replaceState(null, null, `/posts/${createdPost.id}`)
               removeItem(postLocalSaveKey)
            } else {
               await request(`/posts/${post.id}`, {
                  method: 'PUT',
                  body: JSON.stringify(post)
               })
               removeItem(postLocalSaveKey)
            }
         }, 2000)
      }
   })

   this.setState = async nextState => {
      if (this.state.postID !== nextState.postID) {
         postLocalSaveKey = `temp-post-${nextState.postID}`

         this.state = nextState
         await fetchPost()
         return
      }

      this.state = nextState
      this.render()

      editor.setState(this.state.post || {
         title: '',
         content: ''
      })
   }

   this.render = () => {
      $target.appendChild($page)
   }

   const fetchPost = async () => {
      const { postID } = this.state

      if (postID !== 'new') {
         const post = await request(`/posts/${postID}`)

         const tempPost = getItem(postLocalSaveKey, {
            title: '',
            constent: ''
         })

         if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
            if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
               this.setState({
                  ...this.setState,
                  post: tempPost
               })
               return
            }
         }

         this.setState({
            ...this.state,
            post
         })
      }
   }
}