import { createClient } from '@tanstack/suspense-cache-query';
import { client as baseClient, cache } from 'services/BaseClient';
import { http } from 'services/BaseUrl';

const client = createClient({
  client: baseClient,
  defaultQueryOptions: {
    cache: 'cache-first',
  },
});

const apiClient = client.injectPortal({
  baseUrl: http,
});

const usePosts = async () => {
  try {
    const response = await apiClient.fetch('/api/posts');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const usePostsQuery = async () => {
  try {
    const response = await apiClient.fetch('/api/posts');
    const cachedResponse = await cache.fetchQuery('/posts', response.data);
    return cachedResponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const usePostsRefetch = async () => {
  try {
    const response = await apiClient.fetch('/api/posts');
    const refetchedPosts = await cache.fetchQuery('/posts', response.data);
    return refetchedPosts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { usePosts, usePostsQuery, usePostsRefetch };