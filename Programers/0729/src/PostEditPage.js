import { request } from "./api.js"
import Editor from "./Editor.js"
import { getItem, setItem } from "./storage.js"

export default function PostEditPage({ $target, initialState }) {
   const $page = document.createElement('div')

   this.state = initialState

   const TEMP_POST_SAVE_KEY = `temp-post-${this.state.postID}`

   const post = getItem(TEMP_POST_SAVE_KEY, {
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
         timer = setTimeout(() => {
            setItem(TEMP_POST_SAVE_KEY, {
               ...post,
               tempSaveDate: new Date()
            })
         }, 1000)
      }
   })

   this.setState = async nextState => {
      console.log(this.state.postID, nextState.postID)
      if (this.state.postID !== nextState.postID) {
         this.state = nextState
         await fetchPost()
         return
      }

      this.state = nextState
      this.render()

      editor.setState(this.state.post)
   }

   this.render = () => {
      $target.appendChild($page)
   }

   const fetchPost = async () => {
      const { postID } = this.state

      if (postID !== 'new') {
         const post = await request(`/posts/${postID}`)

         this.setState({
            ...this.state,
            post
         })
      }
   }
}