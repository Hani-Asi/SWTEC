/* state의 형태
   {
      productName: 상품명,
      basePrice: 상품 기본 가격,
      selectedOptions: [Option]
   }
*/

export default function Cart({ $target, initialState, onRemove }) {
   const $cart = document.createElement('div')

   $target.appendChild($cart)

   this.state = initialState

   this.setState = nextState => {
      this.state = nextState
      this.render()
   }

   const calculateTotalPrice = () => {
      const { basePrice, selectedOptions } = this.state

      return selectedOptions.reduce((acc, option) => {
         return acc + basePrice + option.optionPrice
      }, 0)
   }

   this.render = () => {
      const { productName, basePrice, selectedOptions } = this.state
      $cart.innerHTML = `
         <ul>
            ${Array.isArray(selectedOptions) && selectedOptions.map(options => `
               <li>${productName} - ${option.optionName} | ${basePrice + option.optionPrice}</li>
            `).join('')}
         </ul>
         <div>
            ${calculateTotalPrice()}
         </div>
      `
   }
   this.render()
}
