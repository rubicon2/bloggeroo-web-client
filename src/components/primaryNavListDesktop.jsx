import UnstyledList from './unstyledList';
import { NavButton } from './styles/buttons';
import LogOutButton from './logOutButton';
import { Link } from 'react-router';
import styled from 'styled-components';

const NavList = styled(UnstyledList)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RightListItem = styled.li`
  margin-left: auto;
`;

export default function PrimaryNavListDesktop({ isLoggedIn }) {
  return (
    <NavList>
      {isLoggedIn ? (
        <>
          <li>
            <NavButton as={Link} to="/">
              Blogs
            </NavButton>
          </li>
          <li>
            <NavButton as={Link} to="/my-comments">
              My Comments
            </NavButton>
          </li>
          <li>
            <NavButton as={Link} to="/my-profile">
              My Profile
            </NavButton>
          </li>
          <RightListItem>
            <LogOutButton />
          </RightListItem>
        </>
      ) : (
        <>
          <li>
            <NavButton as={Link} to="/">
              Blogs
            </NavButton>
          </li>
          <RightListItem>
            <NavButton as={Link} to="/sign-up">
              Sign Up
            </NavButton>
          </RightListItem>
          <li>
            <NavButton as={Link} to="/log-in">
              Log In
            </NavButton>
          </li>
        </>
      )}
    </NavList>
  );
}
