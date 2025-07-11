import fetchAccess from './fetchAccess';

// This can be used in event handlers, or in a component with the useAuthFetch hook wrapped around it.
export default async function authFetch(url, accessRef, options = {}) {
  try {
    const { headers, ...otherOptions } = options;
    // Try fetch with provided access code.
    let dataResponse = await fetch(url, {
      headers: {
        ...headers,
        Authorization: accessRef.current ? 'Bearer ' + accessRef.current : '',
      },
      // E.g. method: 'post'! Body!
      ...otherOptions,
    });

    // If response is 401, try to get a new access code.
    if (dataResponse.status === 401) {
      // Try to get a new access token.
      accessRef.current = await fetchAccess();
      // If new access token received (i.e. not null), do the original fetch again.
      if (accessRef.current) {
        dataResponse = await fetch(url, {
          headers: {
            ...headers,
            Authorization: accessRef.current
              ? 'Bearer ' + accessRef.current
              : '',
          },
          ...options,
        });
      }
    }
    return { response: dataResponse };
  } catch (error) {
    return { fetchError: error };
  }
}
