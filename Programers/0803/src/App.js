import Header from "./Header.js";


export default function App({ $target }) {
   const header = new Header({
      $target,
      onKeywordInput: (keyword) => {
         if (keyword.trim().length > 2) {
            console.log(keyword)
         }
      }
   })
}