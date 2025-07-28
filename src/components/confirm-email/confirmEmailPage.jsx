import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import { useLoaderData, useRouteError } from 'react-router';

export default function ConfirmEmailPage() {
  const { message } = useLoaderData();
  const error = useRouteError();
  return (
    <main>
      <PageTitleBar title="Confirm Email" />
      <Container>{error ? error.message : message}</Container>
    </main>
  );
}
