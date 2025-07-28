import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import Form from '../form';
import FormRow from '../formRow';
import { GeneralButton } from '../styles/buttons';

import { useLoaderData, useRouteError } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';
import responseToJsend from '../../ext/responseToJsend';

const SubmitButton = styled(GeneralButton)`
  padding: 16px;
`;

export default function ResetPasswordPage() {
  const token = useLoaderData();
  // Use for errors and response messages.
  const [responseMessage, setResponseMessage] = useState(
    useRouteError()?.message,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [resetSuccessful, setResetSuccessful] = useState(false);

  async function resetPassword(event) {
    // Put in a form with password and confirm password inputs.
    // Do fetch (not authFetch), using the token as the header token.
    // Redirect to success page or whatever.
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/account/reset-password`,
        {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: new URLSearchParams(new FormData(event.target)),
        },
      );
      const { data, error, status } = await responseToJsend(response);
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
      <PageTitleBar title="Reset Password" />
      <Container>
        {!resetSuccessful && (
          <Form onSubmit={resetPassword}>
            <FormRow label="Password">
              <input type="password" name="password" />
              <small>
                {validationErrors?.password ? validationErrors.password : ''}
              </small>
            </FormRow>
            <FormRow label="Confirm password">
              <input type="password" name="confirm_password" />
              <small>
                {validationErrors?.confirm_password
                  ? validationErrors.confirm_password
                  : ''}
              </small>
            </FormRow>
            <SubmitButton type="submit" disabled={isFetching}>
              Submit
            </SubmitButton>
          </Form>
        )}
        {responseMessage && <p>{responseMessage}</p>}
      </Container>
    </main>
  );
}
