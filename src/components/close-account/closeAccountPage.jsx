import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import { useLoaderData, useRouteError } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AppContexts';

export default function CloseAccountPage() {
  const { message } = useLoaderData();
  const error = useRouteError();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  if (isLoggedIn) setIsLoggedIn(false);
  return (
    <main>
      <PageTitleBar title="Close Account" />
      <Container>{error ? error.message : message}</Container>
    </main>
  );
}
