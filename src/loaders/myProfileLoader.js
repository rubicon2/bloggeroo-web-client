import authFetch from '../ext/authFetch';
import decodeAccess from '../ext/decodeAccess';
import responseToJsend from '../ext/responseToJsend';

export default function myProfileLoader(accessRef) {
  return async () => {
    // Make sure we have an access token, if the user is already logged in.
    const decoded = await decodeAccess(accessRef);
    const userId = decoded?.id ? decoded.id : '';
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/users/${userId}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const { data, error } = await responseToJsend(response);
    if (error) throw error;
    return data.user;
  };
}
