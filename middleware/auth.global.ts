import type { LayoutKey } from "#build/types/layouts";
import { useHeaders } from "../utils/http-headers";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $isAuthenticated }: any = useNuxtApp();
  const headers = useHeaders();

  try {
    const fromAdminLayout = from?.meta?.layout;
    const toAdminLayout = to?.meta?.layout;
    if (
      fromAdminLayout === ("admin" as LayoutKey) ||
      toAdminLayout === ("admin" as LayoutKey)
    ) {
      const { data, error: authenticatedError } = await useFetch(
        "/api/admin/isAuthenticated",
        {
          headers: {
            ...headers,
          },
        },
      );
      $isAuthenticated(authenticatedError) as any;
    }
  } catch (error: any) {
    console.log(error?.message);
  }
});
