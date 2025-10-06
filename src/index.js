// src/index.js

// New file

import React, { memo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'tanstack-query-client';
import { ReactQueryDevtools } from 'react-query/devtools';

// Create a client
const queryClient = new QueryClient();

function usePosts() {
  const { data, error, isLoading, isFetching, refetch } =
    React.useQuery(
      ['posts'],
      async () => {
        try {
          const response = await fetch('/api/posts');
          return response.json();
        } catch (error) {
          return { message: 'Failed to fetch posts' };
        }
      },
      {
        // Keep refetching when the user is idle (60 seconds)
        staleTime: Infinity,
      }
    );

  // Support refetching on mounts and updates
  useEffect(() => {
    if (window.location.hash.startsWith('#refetch')) {
      refetch();
      window.location.hash = '';
    }
  }, [refetch]);

  return {
    posts: data || [],
    error,
    isLoading,
    isFetching,
    refetch,
  };
}

function Home() {
  const { posts, error, isLoading, isFetching, refetch } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={refetch}>Refetch Posts</button>
      <button onClick={() => (window.location.hash = '#refetch')}>Force Refetch</button>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);