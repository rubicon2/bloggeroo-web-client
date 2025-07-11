import Root from './components/root';
import LoginPage from './components/logInPage';
import BlogsPage from './components/blogs/blogsPage';
import BlogPage from './components/blogs/blogPage';
import ErrorPage from './components/errorPage';
import CommentsPage from './components/comments/commentsPage';
import CommentPage from './components/comments/commentPage';
import UserPage from './components/users/userPage';
import MyProfilePage from './components/users/myProfilePage';
import SignUpPage from './components/sign-up/signUpPage';

import blogsLoader from './loaders/blogsLoader';
import blogLoader from './loaders/blogLoader';
import commentsLoader from './loaders/commentsLoader';
import commentLoader from './loaders/commentLoader';
import userLoader from './loaders/userLoader';
import myProfileLoader from './loaders/myProfileLoader';

import { AccessContext } from './contexts/AppContexts';

import { useContext, useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

// This re-generates the browser router every time the state (i.e. access token) changes. Not great.
// But the only way I could find to get the access token into the loader was by currying the access token
// into generated loader functions. So when the access token changes, the loader functions need to be re-generated.
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
              {
                path: 'users/:userId',
                Component: UserPage,
                loader: userLoader(accessRef),
              },
            ],
          },
        ],
      },
    ]);
  }, [accessRef]);

  return <RouterProvider router={router} />;
}
