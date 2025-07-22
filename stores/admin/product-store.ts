import {defineStore} from "pinia";

export const useProductStore = defineStore('product-store', () => {
  const productInput = ref({
    id: null,
    name: "",
    color: "",
    categoryId: null,
    price: 0
  })
  const uploadProductImages = ref([])
  const productColors = ref(['red', 'black', 'white', 'green', 'blue', 'yellow', 'orange', 'gray'])

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

  async function deleteProduct(id: number) {
    const res = await $fetch<{ message: string }>("api/admin/product/delete-product", {
      headers: {
        ...headers
      },
      method: 'DELETE',
      body: JSON.stringify({id: id})
    });
    successMsg(res?.message)
  }

  async function changePage(newPage: number) {
    page.value = newPage
    await fetchProducts()
  }

  function uploadImagePayload(productId: number, file: string) {
    return new Promise((resolve, reject) => {
      try {
        const formData = new FormData();

        // formData.append("Authorization", headers?.Authorization);
        formData.append("file", file);
        formData.append("productId", productId.toString());


        const requestOptions = {
          headers: {
            ...headers
          },
          method: "POST",
          body: formData,
        };
        resolve(requestOptions)


      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    productId,
    uploadProductImages,
    showUploadedImageModal,
    showUploadImage,
    uploadImagePayload,
    productInput,
    search,
    productData,
    edit,
    fetchProducts,
    productColors,
    changePage,
    deleteProduct
  }
})