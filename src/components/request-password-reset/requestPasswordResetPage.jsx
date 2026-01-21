import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import Form from '../form';
import FormRow from '../formRow';
import { GeneralButton } from '../styles/buttons';
import { useState } from 'react';
import styled from 'styled-components';
import responseToJsend from '../../ext/responseToJsend';

const SubmitButton = styled(GeneralButton)`
  padding: 16px;
`;

export default function RequestPasswordResetPage() {
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  async function requestPasswordReset(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/account/request-password-reset`,
        {
          method: 'post',
          body: new URLSearchParams(new FormData(event.target)),
        },
      );
      const { status, data, error } = await responseToJsend(response);
      if (error) setResponseMessage(error.message);
      switch (status) {
        case 'success': {
          setResetSuccessful(true);
          setResponseMessage(data.message);
          break;
        }
        case 'fail': {
          if (data.validationErrors) setValidationErrors(data.validationErrors);
          if (data.message) setResponseMessage(data.message);
          break;
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
        <PageTitleBar title="Reset Password" />
        {!resetSuccessful && (
          <Form onSubmit={requestPasswordReset}>
            <FormRow label="Email">
              <input type="email" name="email" />
              <small>
                {validationErrors?.email ? validationErrors.email : ''}
              </small>
            </FormRow>
            <SubmitButton type="submit" disabled={isFetching}>
              Request Password Reset
            </SubmitButton>
          </Form>
        )}
        {responseMessage && <p>{responseMessage}</p>}
      </Container>
    </main>
  );
}
