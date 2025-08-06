import BlogHeader from './blogHeader';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import UnstyledLink from '../unstyledLink';
import PreservedSpacingP from '../styles/preservedSpacingP';
import { limitWords } from '../../ext/truncateStr';

export default function BlogsListBlog({ blog }) {
  let teaser = limitWords(blog.body, 50);
  if (blog.body.split(' ').length >= 50) teaser += '...';
  return (
    <UnstyledLink to={`/blogs/${blog.id}`}>
      <div>
        <BlogHeader>{blog.title}</BlogHeader>
        <small>
          By {blog.owner.name} at{' '}
          {blog.publishedAt
            ? dateTimeFormatter.format(new Date(blog.publishedAt))
            : 'never'}
          <div>{blog.comments.length} comments</div>
        </small>
        <PreservedSpacingP>{teaser}</PreservedSpacingP>
      </div>
    </UnstyledLink>
  );
}
