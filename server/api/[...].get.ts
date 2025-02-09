export default eventHandler(async (event) => {
  const config = useRuntimeConfig();
  const BASEURL = config.public.tmdbBaseUrl as string;
  const BEARER = config.public.tmdbAuthToken as string;

  const route = event.context.params._ || ``;
  const res = await $fetch(`${BASEURL}/${route}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER}`,
    },
  });
  return res || [];
});
