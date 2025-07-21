import { defineStore } from "pinia";

export const useUserStore = defineStore("user-store", () => {
  const search = ref("");
  const userData = ref<any>(null);
  const page = ref(1);
  const limit = ref(10);
  const headers = useHeaders();

  const useError = ref<any>(null);

  async function fetchUsers() {
    const { data, refresh, error } = await useFetch(
      "/api/admin/user/get-users",
      {
        headers: {
          ...headers,
        },
        query: {
          search: search.value,
          page: page.value,
          limit: limit.value,
        },
      },
    );

    useError.value = error;
    userData.value = data.value;
    limit.value = userData.value?.metaData?.limit;
    page.value = userData.value?.metaData?.page;
  }

  async function changePage(newPage: number) {
    page.value = newPage;
    await fetchUsers();
  }

  return { changePage, fetchUsers, userData, search, useError };
});
