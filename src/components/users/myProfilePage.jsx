import { useLoaderData } from 'react-router';
import Container from '../container';

export default function MyProfilePage() {
  const user = useLoaderData();
  return (
    <main>
      <Container>
        <h2>My Profile</h2>
        Name: {user.name}
        Email: {user.email}
      </Container>
    </main>
  );
}
