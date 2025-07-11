import responseToJsend from '../ext/responseToJsend';

export default function closeAccountLoader() {
  return async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const token = searchParams.get('token');
    if (!token) throw new Error('Error - account could not be closed');
    // Delete account, then load the page with the success message or error.
    // Use regular fetch instead of auth fetch - don't want fiddling around with accessRef.
    // User is not necessarily logged in when they cilck the delete account link in their email.
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/account`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data;
  };
}
