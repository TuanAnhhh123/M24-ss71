// src/features/posts/AddPostForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';
import './AddPostForm.css';

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onImageChanged = (e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value);
  const onCategoryChanged = (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value);

  const onSavePostClicked = () => {
    if (title && image && category) {
      dispatch(addPost({ id: Date.now(), title, image, category, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
      setTitle('');
      setImage('');
      setCategory('');
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <form>
      <label htmlFor="postTitle">Title:</label>
      <input type="text" id="postTitle" value={title} onChange={onTitleChanged} />

      <label htmlFor="postImage">Image URL:</label>
      <input type="text" id="postImage" value={image} onChange={onImageChanged} />

      <label htmlFor="postCategory">Category:</label>
      <input type="text" id="postCategory" value={category} onChange={onCategoryChanged} />

      <button type="button" onClick={onSavePostClicked}>Save Post</button>
    </form>
  );
};

export default AddPostForm;
