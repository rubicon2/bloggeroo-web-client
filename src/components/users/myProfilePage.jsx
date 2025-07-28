import Container from '../container';
import Form from '../form';
import FormRow from '../formRow';
import { DeleteButton } from '../styles/buttons';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useLoaderData } from 'react-router';
import { useContext, useState } from 'react';
import styled from 'styled-components';

const PaddedDeleteButton = styled(DeleteButton)`
  padding: 16px;
`;

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
        <Form>
          <FormRow label="Name">
            <input type="text" value={user.name} disabled="true" />
          </FormRow>
          <FormRow label="Email">
            <input type="email" value={user.email} disabled="true" />
          </FormRow>
          <PaddedDeleteButton
            type="button"
            disabled={isFetching}
            onClick={requestAccountDeletion}
          >
            Delete Account
          </PaddedDeleteButton>
        </Form>
        {responseMessage && <p>{responseMessage}</p>}
      </Container>
    </main>
  );
}
