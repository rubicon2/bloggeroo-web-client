import styled from 'styled-components';
import Container from './container';

const FooterBackground = styled.footer`
  background-color: var(--theme-main-color);
  padding: 1rem 0;
  margin-top: 1rem;
`;

const FooterText = styled.div`
  color: white;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterBackground>
      <Container>
        <FooterText>{import.meta.env.VITE_FOOTER_TEXT}</FooterText>
      </Container>
    </FooterBackground>
  );
}
