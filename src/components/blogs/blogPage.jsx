import Container from '../container';
import CommentsList from '../comments/commentsList';
import CommentForm from '../comments/commentForm';
import { GeneralButton } from '../styles/buttons';
import BlogHeader from './blogHeader';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useContext, useState } from 'react';
import { useLoaderData, useRouteError } from 'react-router';
import dateTimeFormatter from '../../ext/dateTimeFormatter';

export default function BlogPage() {
  const { blog, comments } = useLoaderData();
  const refresh = useRefresh();

  const accessRef = useContext(AccessContext);

  const [isFetching, setIsFetching] = useState(false);
  const [commentValidationErrors, setCommentValidationErrors] = useState(null);
  const [error, setError] = useState(useRouteError());
  const [isCreatingComment, setIsCreatingComment] = useState(false);

  async function createComment(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments?blogId=${blog.id}`,
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
          <BlogHeader as="h2">{blog.title}</BlogHeader>
          <small>
            By {blog.owner.name} at{' '}
            {blog.publishedAt
              ? dateTimeFormatter.format(new Date(blog.publishedAt))
              : 'never'}
          </small>

          <p>{blog.body}</p>
          <h3>Comments {comments?.length > 0 ? `(${comments.length})` : ''}</h3>
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
