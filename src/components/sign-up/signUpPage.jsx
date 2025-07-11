import Container from '../container';
import PageTitleBar from '../pageTitleBar';
import Form from '../form';
import FormRow from '../formRow';
import { GeneralButton } from '../styles/buttons';
import responseToJsend from '../../ext/responseToJsend';

import { useState } from 'react';
import styled from 'styled-components';

const SubmitButton = styled(GeneralButton)`
  padding: 16px;
`;

export default function SignUpPage() {
  const [isFetching, setIsFetching] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [signUpSuccessful, setSignUpSuccessful] = useState(false);

  async function attemptSignUp(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/account/sign-up`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(new FormData(event.currentTarget)),
        },
      );
      const { status, data, error } = await responseToJsend(response);
      setResponseMessage(error?.message);
      switch (status) {
        case 'success': {
          // If successful, a message will be returned by the server, saying to confirm email address.
          setValidationErrors(null);
          setResponseMessage(data.message);
          setSignUpSuccessful(true);
          break;
        }
        case 'fail': {
          if (data.validationErrors) {
            setValidationErrors(data.validationErrors);
          }
          if (data.message) {
            setResponseMessage(data.message);
          }
          break;
        }
      }
    } catch (error) {
      setValidationErrors(null);
      setResponseMessage(error.message);
    }
    setIsFetching(false);
  }

  return (
    <main>
      <PageTitleBar title="Sign Up" />
      <Container>
        {!signUpSuccessful && (
          <Form onSubmit={attemptSignUp}>
            <FormRow label="Email">
              <input type="email" name="email" />
              <small>
                {validationErrors?.email ? validationErrors.email : ''}
              </small>
            </FormRow>
            <FormRow label="Name">
              <input type="text" name="name" />
              <small>
                {validationErrors?.name ? validationErrors.name : ''}
              </small>
            </FormRow>
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
              Sign Up
            </SubmitButton>
          </Form>
        )}
        {responseMessage && <p>{responseMessage}</p>}
      </Container>
    </main>
  );
}
