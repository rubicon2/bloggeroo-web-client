import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import { useLoaderData, useRouteError } from 'react-router';

export default function CloseAccountPage() {
  const { message } = useLoaderData();
  const error = useRouteError();
  return (
    <main>
      <PageTitleBar title="Close Account" />
      <Container>{error ? error.message : message}</Container>
    </main>
  );
}
