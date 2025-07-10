import { useEffect, useState } from 'react';

export default function useCookie(name) {
  const [cookie, setCookie] = useState(
    document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${name}=`))
      ?.split('=')[1],
  );

  // Not sure useEffect is necessary, but since setting/clearing a cookie is a side effect, using it.
  useEffect(() => {
    if (!cookie) {
      // Clear the browser cookie if the user has set the cookie to nullish value.
      document.cookie = '';
    }
  }, [cookie]);

  return [cookie, setCookie];
}
