import {defineStore} from "pinia";

export const useProductStore = defineStore('product-store', () => {
  const productInput = reactive({
    id: null,
    name: "",
    color: "",
    categoryId: null,
    price: 0
  })
  const uploadProductImages = ref([])
  const productColors = ref(['red','black','white','green','blue','yellow','orange','gray'])

  const edit = ref(false)
  const search = ref("")
  const productData = ref<any>(null)
  const page = ref(1)
  const limit = ref(10)

  const productId = ref(null)
  const showUploadImage = ref(false)
  const showUploadedImageModal = ref(false)
  const headers = useHeaders()

  async function fetchProducts() {
    const {data, refresh} = await useFetch("/api/admin/product/get-products", {
      headers: {
        ...headers
      },
      query: {
        search: search.value,
        page: page.value,
        limit: limit.value
      }
    })
    productData.value = data.value
    limit.value = productData?.value?.metadata.limit
    page.value = productData?.value?.metadata.page
  }
  return {fetchProducts, productColors, productId, productInput}
})