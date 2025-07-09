export default function decodeJwt(jwt) {
  if (!jwt) return null;
  const [header, data] = jwt.split('.');
  const json = atob(data);
  return JSON.parse(json);
}
