import { useQuery, useQueryClient } from '@tanstack/react-query';

export function usePosts(refresh = false) {
  return useQuery(
    [
      '/api/posts',
      {
        // We want to refresh the data if the user navigates back to this route
        // We also want to refresh the data when the user requests it
        staleTime: 0, // Always refetch, or based on cache duration
      },
    ],
    async () => {
      const response = await fetch('/api/posts');
      return response.json();
    },
    {
      // If refresh is true, refetch the data
      // If refresh is false, use the cache instead
      enabled: refresh,
    },
    {
      onSuccess: async () => {
        // Refetch the data after a short delay
        // to demonstrate refetching
        await new Promise((resolve) => setTimeout(resolve, 500));
        useQueryClient().refetchQueries({
          queryKey: ['posts'],
        });
      },
    }
  );
}