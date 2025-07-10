import AppRouter from './AppRouter';
import { AccessContext, UserContext } from './contexts/AppContexts';
import fetchAccess from './ext/fetchAccess';
import useLoginState from './hooks/useLoginState';
import { useEffect, useRef } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLoginState();
  const accessRef = useRef(null);

  // Initialize accessRef - fetch a new access token if user is already logged in.
  useEffect(() => {
    async function getAccess() {
      accessRef.current = await fetchAccess();
    }
    getAccess();
  }, []);

  return (
    <AccessContext value={accessRef}>
      <UserContext value={{ isLoggedIn, setIsLoggedIn }}>
        <AppRouter />
      </UserContext>
    </AccessContext>
  );
}

export default App;
