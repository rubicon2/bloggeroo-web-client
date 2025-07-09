import Container from './container';
import PageTitleBar from './pageTitleBar';
import Form from './form';
import FormRow from './formRow';
import { GeneralButton } from './styles/buttons';
import { devices } from '../mediaQueries';

import { AccessContext, UserContext } from '../contexts/AppContexts';
import responseToJsend from '../ext/responseToJsend';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Cols = styled.div`
  display: grid;

  @media ${devices.tablet} {
    grid-template-columns: 1.5fr 1fr;
  }
`;

const SubmitButton = styled(GeneralButton)`
  padding: 16px;
`;

export default function LogInPage() {
  const accessRef = useContext(AccessContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [validationErrors, setValidationErrors] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  // If user is already logged in, stop them accessing the log in page.
  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  async function attemptLogIn(event) {
    event.preventDefault();
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/account/log-in`,
        {
          method: 'post',
          // Need this, otherwise cookie header in response is ignored by browser.
          // Same-site doesn't work even though both client and server are on localhost. Whatever...
          // I guess most of the time the cookie is going to be sent from a backend on a different domain anyway.
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(new FormData(event.currentTarget)),
        },
      );
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          // Refresh token will be sent over in http response httpOnly cookie header.
          // Save access token.
          accessRef.current = data.access;
          setIsLoggedIn(true);
          setValidationErrors(null);
          // Redirect to blogs page.
          navigate('/');
          break;
        }
        case 'fail': {
          if (data.validationErrors) {
            setValidationErrors(data.validationErrors);
          }
          if (data.message) {
            setValidationErrors({
              password: [data.message],
              array: [data.message],
            });
          }
          break;
        }
      }
    } catch (error) {
      setValidationErrors(null);
      setError(error);
    }
    setIsFetching(false);
  }

  return (
    <main>
      <PageTitleBar title="Log In" />
      <Container>
        <Cols>
          <Form onSubmit={attemptLogIn}>
            <FormRow label="Email">
              <input type="email" name="email" id="email" />
              <small>
                {validationErrors?.email ? validationErrors.email : ''}
              </small>
            </FormRow>
            <FormRow label="Password">
              <input type="password" name="password" id="password" />
              <small>
                {validationErrors?.password ? validationErrors.password : ''}
              </small>
            </FormRow>
            <SubmitButton type="submit" disabled={isFetching}>
              Log In
            </SubmitButton>
          </Form>
        </Cols>
        {error && <p>{error.message}</p>}
      </Container>
    </main>
  );
}
