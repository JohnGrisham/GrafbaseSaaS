export const isAuthScreen = () =>
  typeof window === 'object' &&
  !!window.location.href.match(/\/auth\/(signin|signup)/)?.length;
