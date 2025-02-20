
// TODO: accessToken의 해시값 등으로 변경 필
export const userInfoQueryKey = (accessToken: string | null) => ['userInfo', accessToken];
