import { useSupabaseUser } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  const publicPaths = ['/', '/login'];

  if (publicPaths.includes(to.path)) {
    if ((to.path === '/' || to.path === '/login') && user.value) {
      return navigateTo('/explore');
    }
    return;
  }

  if (!user.value) {
    return navigateTo('/login');
  }

});
