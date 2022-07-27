export default function App() {
   this.render = () => {
      alert('hello there')
   }
   this.render()
}

export const printToday = () => {
   console.log(new Date().toLocaleString())
}