import ProductOptions from "./ProductOptions.js"

const dummyData = [
   {
      optionName: "신라면",
      optionPrice: 2000,
      stock: 10
   },
   {
      optionName: "진라면",
      optionPrice: 1500,
      stock: 8
   },
   {
      optionName: "삼양",
      optionPrice: 1000,
      stock: 0
   }
]

const $target = document.querySelector("#app")

new ProductOptions({
   $target,
   initialState: dummyData
})
