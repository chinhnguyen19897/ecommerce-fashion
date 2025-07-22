import {defineStore} from "pinia";

export const useCartStore = defineStore('cart-store', () => {
  const cartData = ref<Record<string, any>>([])
  const showCart = ref<boolean>(false)
  const totalPrice = ref<number>(0)
  const defaultQuantity = ref<number>(1)

  function toggleCartDrawer() {
    showCart.value = !showCart.value
  }

  function storeCartDataToLocalStorage() {
    localStorage.setItem('cartData', JSON.stringify(cartData.value))
  }

  function getCartDataFormLocalStorage() {
    const data = localStorage.getItem('cartData')
    if (typeof data !== 'object') {
      cartData.value = JSON.parse(data)
      getTotalPrice()
    }
  }

  function addToCart(product: Record<string, any>) {
    const productExist = cartData.value.filter(i => i.id === product?.id)

    if (productExist.length === 0) {
      const updateTotalPrice = parseFloat(product?.price) * defaultQuantity.value
      cartData.value.push({...product, quantity: defaultQuantity, totalProductPrice: updateTotalPrice})
      storeCartDataToLocalStorage()
      getTotalPrice()
    }
  }

  function addQuantity(productId: number, newQuantity: number) {
    const newArr = cartData.value.filter(i => i.id === productId)
    if (newArr.length > 0) {
      const {quantity, totalProductPrice, ...restProps} = newArr[0]
      const updateQuantity = quantity + newQuantity
      const updateTotalPrice = parseFloat(totalProductPrice) + parseFloat(totalProductPrice)


      //remove this product and add it again
      const updateProduct = cartData.value.filter(i => i.id !== productId)
      cartData.value = []
      cartData.value = [...updateProduct]
      cartData.value.push({
        quantity: updateQuantity,
        totalProductPrice: updateTotalPrice,
        ...restProps
      })

      getTotalPrice()
      storeCartDataToLocalStorage()
    }
  }

  function reduceQuantity(productId: number, newQuantity: number) {
    const newArr = cartData.value.filter(i => i.id === productId)
    if (newArr.length > 0) {
      if (newQuantity <= parseFloat(newArr[0].quantity)) {
        const {quantity, totalProductPrice, ...restProps} = newArr[0]
        const updateQuantity = quantity - newQuantity
        if (updateQuantity === 0) {
          removeProductToCart(productId)
          getTotalPrice()
          storeCartDataToLocalStorage()
        } else {
          const updateTotalPrice = parseFloat(totalProductPrice) - parseFloat(restProps.price)
          const updateProduct = cartData.value.filter(i => i.id !== productId)
          cartData.value = []
          cartData.value = [...updateProduct]
          cartData.value.push({
            quantity: updateQuantity,
            totalProductPrice: updateTotalPrice,
            ...restProps
          })
          getTotalPrice()
          storeCartDataToLocalStorage()
        }
      }
    }
  }

  function getTotalPrice() {
    totalPrice.value = 0
    cartData.value.forEach(product => {
      totalPrice.value += product?.totalProductPrice
    })
  }

  function removeProductToCart(productId: number) {
    const newArr = cartData.value.filter(item => item.id !== productId)
    cartData.value = [...newArr]
    getTotalPrice()
    storeCartDataToLocalStorage()
  }

  function clearOutCart() {
    cartData.value = []
    totalPrice.value = 0
    localStorage.clear()
    getTotalPrice()
    storeCartDataToLocalStorage()
  }

  return {
    cartData,
    addToCart,
    getCartDataFormLocalStorage,
    storeCartDataToLocalStorage,
    defaultQuantity,
    reduceQuantity,
    totalPrice,
    addQuantity,
    clearOutCart,
    removeProductToCart,
    toggleCartDrawer,
    showCart
  }
})