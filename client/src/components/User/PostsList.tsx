// src/features/posts/PostsList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { getPosts, deletePost } from './postsSlice';
import './PostsList.css';

const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(getPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = (postId: number) => {
    dispatch(deletePost(postId));
  };

  let content;

  if (postStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postStatus === 'succeeded') {
    content = posts.map(post => (
      <tr key={post.id}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td><img src={post.image} alt={post.title} /></td>
        <td>{post.category}</td>
        <td>{post.createdAt}</td>
        <td>{post.updatedAt}</td>
        <td>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </td>
      </tr>
    ));
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Image</th>
          <th>Category</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {content}
      </tbody>
    </table>
  );
};

export default PostsList;
