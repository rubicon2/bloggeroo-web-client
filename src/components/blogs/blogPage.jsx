import Container from '../container';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import { GeneralButton } from '../styles/buttons';
import PreservedSpacingP from '../styles/preservedSpacingP';

import { AccessContext, UserContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useContext, useState } from 'react';
import { Link, useLoaderData, useRouteError } from 'react-router';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  margin-top: 1rem;
`;

const BlogHeader = styled.h2`
  margin: 0;
`;

export default function BlogPage() {
  const { blog, comments } = useLoaderData();
  const refresh = useRefresh();

  const { isLoggedIn } = useContext(UserContext);
  const accessRef = useContext(AccessContext);

  const [isFetching, setIsFetching] = useState(false);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  async function createComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/comments?blogId=${blog.id}`,
      accessRef,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );
    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setCommentValidationErrors(data.validationErrors);
      switch (status) {
        case 'success': {
          setIsCreatingComment(false);
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <main>
      {blog && (
        <Container>
          <HeaderContainer>
            <Link to="/">Back to blogs</Link>
            <BlogHeader>{blog.title}</BlogHeader>
            <small>
              By {blog.owner.name} at{' '}
              {blog.publishedAt
                ? dateTimeFormatter.format(new Date(blog.publishedAt))
                : 'never'}
            </small>
          </HeaderContainer>
          <PreservedSpacingP>{blog.body}</PreservedSpacingP>
          <h3>Comments {comments?.length > 0 ? `(${comments.length})` : ''}</h3>
          {isLoggedIn && (
            <>
              {isCreatingComment ? (
                <>
                  <CommentForm
                    buttonText="Submit"
                    initialValues={{ text: '' }}
                    isFetching={isFetching}
                    validationErrors={commentValidationErrors}
                    onSubmit={createComment}
                  >
                    <GeneralButton
                      type="button"
                      onClick={() => setIsCreatingComment(false)}
                    >
                      Cancel
                    </GeneralButton>
                  </CommentForm>
                </>
              ) : (
                <GeneralButton
                  type="button"
                  onClick={() => setIsCreatingComment(true)}
                >
                  Add comment
                </GeneralButton>
              )}
            </>
          )}
          <CommentsList
            comments={comments}
            onReply={refresh}
            onDelete={refresh}
          />
          {error && <p>{error.message}</p>}
        </Container>
      )}
    </main>
  );
}
