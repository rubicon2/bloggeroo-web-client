export default async function fetchAccess() {
  const accessResponse = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/auth/access`,
    {
      method: 'post',
      credentials: 'include',
    },
  );

  if (accessResponse.ok) {
    const json = await accessResponse.json();
    return json.data.access;
  }

  // If accessResponse was failed.
  return null;
}
