import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import { useLoaderData, useRouteError } from 'react-router';

export default function ConfirmEmailPage() {
  const { message } = useLoaderData();
  const error = useRouteError();
  return (
    <main>
      <Container>
        <PageTitleBar title="Confirm Email" />
        {error ? error.message : message}
      </Container>
    </main>
  );
}
