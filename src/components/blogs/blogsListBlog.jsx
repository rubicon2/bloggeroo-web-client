import BlogHeader from './blogHeader';
import UnstyledLink from '../unstyledLink';
import MarkdownBlog from './markdownBlog';
import { GeneralButton } from '../styles/buttons';
import createBlogPreviewText from '../../ext/createBlogPreviewText';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import styled from 'styled-components';

const BlogLink = styled(UnstyledLink)`
  display: block;
  &:hover {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-decoration: underline;
    }
  }
`;

export default function BlogsListBlog({ blog }) {
  const blogPreview = createBlogPreviewText(blog);
  return (
    <BlogLink to={`/blogs/${blog.id}`}>
      <BlogHeader>{blog.title}</BlogHeader>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt
          ? dateTimeFormatter.format(new Date(blog.publishedAt))
          : 'never'}
        <div>{blog.comments.length} comments</div>
      </small>
      <MarkdownBlog>{blogPreview}</MarkdownBlog>
      <GeneralButton>Read the rest of this blog</GeneralButton>
    </BlogLink>
  );
}
