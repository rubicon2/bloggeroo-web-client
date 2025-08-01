import BlogHeader from './blogHeader';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import UnstyledLink from '../unstyledLink';
import PreservedSpacingP from '../styles/preservedSpacingP';

export default function BlogsListBlog({ blog }) {
  return (
    <UnstyledLink to={`/blogs/${blog.id}`}>
      <div>
        <BlogHeader>{blog.title}</BlogHeader>
        <small>
          By {blog.owner.name} at{' '}
          {blog.publishedAt
            ? dateTimeFormatter.format(new Date(blog.publishedAt))
            : 'never'}
        </small>
        <PreservedSpacingP>{blog.body}</PreservedSpacingP>
      </div>
    </UnstyledLink>
  );
}
