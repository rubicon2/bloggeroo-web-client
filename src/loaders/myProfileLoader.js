import authFetch from '../ext/authFetch';
import decodeJwt from '../ext/decodeJwt';
import responseToJsend from '../ext/responseToJsend';

export default function myProfileLoader(accessRef) {
  return async () => {
    const decoded = decodeJwt(accessRef.current);
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
