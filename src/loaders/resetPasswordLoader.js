export default function resetPasswordLoader() {
  return async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const token = searchParams.get('token');
    if (!token) throw new Error('Error - valid token not found.');
    return token;
  };
}
