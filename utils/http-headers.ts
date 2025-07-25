export function useHeaders() {
  const userCookie: Ref<{
    message: string;
    data: {
      token: {
        accessToken: string;
        refreshToken: string;
      };
    };
  }> = useCookie("user", userCookieSettings);
  const accessToken = userCookie.value?.data?.token?.accessToken;
  return {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}
