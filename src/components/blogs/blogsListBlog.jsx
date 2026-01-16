import BlogHeader from './blogHeader';
import UnstyledLink from '../unstyledLink';
import MarkdownBlog from './markdownBlog';
import createBlogPreviewText from '../../ext/createBlogPreviewText';
import dateTimeFormatter from '../../ext/dateTimeFormatter';

export default function BlogsListBlog({ blog }) {
  const blogPreview = createBlogPreviewText(blog);
  return (
    <UnstyledLink to={`/blogs/${blog.id}`}>
      <BlogHeader>{blog.title}</BlogHeader>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt
          ? dateTimeFormatter.format(new Date(blog.publishedAt))
          : 'never'}
        <div>{blog.comments.length} comments</div>
      </small>
      <MarkdownBlog>{blogPreview}</MarkdownBlog>
    </UnstyledLink>
  );
}
