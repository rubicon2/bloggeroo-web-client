import Root from './components/root';
import LoginPage from './components/logInPage';
import BlogsPage from './components/blogs/blogsPage';
import BlogPage from './components/blogs/blogPage';
import ErrorPage from './components/errorPage';
import CommentsPage from './components/comments/commentsPage';
import CommentPage from './components/comments/commentPage';
import MyProfilePage from './components/users/myProfilePage';
import SignUpPage from './components/sign-up/signUpPage';
import CloseAccountPage from './components/close-account/closeAccountPage';
import ConfirmEmailPage from './components/confirm-email/confirmEmailPage';
import RequestPasswordResetPage from './components/request-password-reset/requestPasswordResetPage';
import ResetPasswordPage from './components/reset-password/resetPasswordPage';

import blogsLoader from './loaders/blogsLoader';
import blogLoader from './loaders/blogLoader';
import commentsLoader from './loaders/commentsLoader';
import commentLoader from './loaders/commentLoader';
import myProfileLoader from './loaders/myProfileLoader';
import closeAccountLoader from './loaders/closeAccountLoader';
import confirmEmailLoader from './loaders/confirmEmailLoader';
import resetPasswordLoader from './loaders/resetPasswordLoader';

import { AccessContext } from './contexts/AppContexts';
import { useContext, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

export default function AppRouter() {
  const accessRef = useContext(AccessContext);
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        Component: Root,
        ErrorBoundary: ErrorPage,
        children: [
          {
            ErrorBoundary: ErrorPage,
            children: [
              {
                index: true,
                Component: BlogsPage,
                loader: blogsLoader(accessRef),
              },
              {
                path: 'log-in',
                Component: LoginPage,
              },
              {
                path: 'sign-up',
                Component: SignUpPage,
              },
              {
                path: 'confirm-email',
                Component: ConfirmEmailPage,
                loader: confirmEmailLoader(accessRef),
              },
              {
                path: 'request-password-reset',
                Component: RequestPasswordResetPage,
              },
              {
                path: 'reset-password',
                Component: ResetPasswordPage,
                loader: resetPasswordLoader(accessRef),
              },
              {
                path: 'close-account',
                Component: CloseAccountPage,
                loader: closeAccountLoader(accessRef),
              },
              {
                path: 'my-comments',
                Component: CommentsPage,
                loader: commentsLoader(accessRef),
              },
              {
                path: 'my-profile',
                Component: MyProfilePage,
                loader: myProfileLoader(accessRef),
              },
              {
                path: 'blogs',
                Component: BlogsPage,
                loader: blogsLoader(accessRef),
              },
              {
                path: 'blogs/:blogId',
                Component: BlogPage,
                loader: blogLoader(accessRef),
              },
              {
                path: 'comments/:commentId',
                Component: CommentPage,
                loader: commentLoader(accessRef),
              },
            ],
          },
        ],
      },
    ]);
  }, [accessRef]);

  return <RouterProvider router={router} />;
}
