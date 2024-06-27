
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';


interface Post {
  id: number;
  title: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const fetchPosts = async (): Promise<Post[]> => {

  return [
    { id: 1, title: 'React', image: 'react.png', category: 'Frontend', createdAt: '2024-06-27', updatedAt: '2024-06-27' },
    { id: 2, title: 'Java', image: 'java.png', category: 'Backend', createdAt: '2024-06-27', updatedAt: '2024-06-27' },
  ];
};

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response;
});

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
