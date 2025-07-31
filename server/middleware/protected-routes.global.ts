export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  console.log(url.pathname);
  const validUnAuthPaths = [
    '/user/login',
    '/user/register',
    '/user/code',
    '/api/_nuxt_icon/lucide.json',
  ];
  if (!validUnAuthPaths.includes(url.pathname)) {
    return sendRedirect(event, '/user/login', 301);
  }
});
