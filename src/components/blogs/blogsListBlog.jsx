import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton } from '../styles/buttons';
import BlogHeader from './blogHeader';
import DeleteButton from '../deleteButton';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
import { Link } from 'react-router';

export default function BlogsListBlog({ blog, onDelete }) {
  return (
    <div>
      <BlogHeader>{blog.title}</BlogHeader>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt
          ? dateTimeFormatter.format(new Date(blog.publishedAt))
          : 'never'}
      </small>
      <p>{blog.body}</p>
      <ListItemButtonsContainer>
        <Link to={`/blogs/${blog.id}`}>
          <GeneralButton type="button">Edit</GeneralButton>
        </Link>
        <DeleteButton
          url={`${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blog.id}`}
          onDelete={onDelete}
        >
          Delete
        </DeleteButton>
      </ListItemButtonsContainer>
    </div>
  );
}
