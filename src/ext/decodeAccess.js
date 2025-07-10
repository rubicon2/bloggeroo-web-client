import fetchAccess from './fetchAccess';
import decodeJwt from './decodeJwt';

export default async function decodeAccess(accessRef) {
  // Make sure we have an access token if the user is logged in.
  if (!accessRef.current) accessRef.current = await fetchAccess();
  return decodeJwt(accessRef.current);
}
