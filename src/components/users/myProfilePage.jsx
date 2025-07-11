import { useContext, useState } from 'react';
import Container from '../container';
import Form from '../form';
import { DeleteButton } from '../styles/buttons';

import { useLoaderData } from 'react-router';
import authFetch from '../../ext/authFetch';
import { AccessContext } from '../../contexts/AppContexts';
import responseToJsend from '../../ext/responseToJsend';

export default function MyProfilePage() {
  const accessRef = useContext(AccessContext);
  const user = useLoaderData();
  const [responseMessage, setResponseMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  async function requestAccountDeletion(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const { response, fetchError } = await authFetch(
        `${import.meta.env.VITE_SERVER_URL}/account/request-close-account`,
        accessRef,
        {
          method: 'post',
        },
      );

      if (fetchError) throw fetchError;
      else {
        const { status, data, error } = await responseToJsend(response);
        if (error) throw error;
        switch (status) {
          case 'success': {
            setResponseMessage(data.message);
          }
        }
      }
    } catch (error) {
      setResponseMessage(error.message);
    }
    setIsFetching(false);
  }

  return (
    <main>
      <Container>
        <h2>My Profile</h2>
        Name: {user.name}
        Email: {user.email}
        <Form onSubmit={requestAccountDeletion}>
          <DeleteButton type="submit" disabled={isFetching}>
            Delete Account
          </DeleteButton>
        </Form>
        {responseMessage && <p>{responseMessage}</p>}
      </Container>
    </main>
  );
}
