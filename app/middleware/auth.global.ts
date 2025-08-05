export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    try {
      const res = await fetch(
        'https://api.pancakepuncher.com/api/v1/auth/validate',
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (import.meta.server) {
    try {
      const res = await fetch('http://localhost:5050/api/v1/auth/validate', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const validUnAuthPaths = [
    '/user/login',
    '/user/register',
    '/user/code',
    '/api/_nuxt_icon/lucide.json',
  ];
  if (!validUnAuthPaths.includes(to.path)) {
    return navigateTo('/user/login', { redirectCode: 301 });
  }
});
