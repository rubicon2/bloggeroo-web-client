import responseToJsend from '../ext/responseToJsend';

export default function confirmEmailLoader() {
  return async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const token = searchParams.get('token');
    if (!token) throw new Error('Error - email could not be confirmed.');
    // Confirm account, then load the page with the success message or error.
    // Use regular fetch instead of auth fetch - don't want fiddling around with accessRef.
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/account/confirm-email`,
      {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data;
  };
}
