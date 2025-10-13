// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/query';
import { Product } from '../../models/Product';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchProducts = async ({ pageParam: page }) => {
    const response = await axios.get(`https://api.example.com/products?page=${page}&limit=${limit}`);
    return response.data;
  };

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    data: { pages }
  } = useInfiniteQuery(
    ['products'],
    fetchProducts,
    {
      getPreviousPageParam: lastPage => lastPage.next,
      getPaginationParams: ({ currentPage }) => ({
        page: currentPage,
        pageParam: currentPage
      }),
      cacheTime: 5 * 60 * 1000
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    const productContainer = document.getElementById('product-container');
    if (productContainer) {
      observer.observe(productContainer);
    }

    return () => {
      if (productContainer) {
        observer.unobserve(productContainer);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div>
      <div id="product-container">{pages.map((group) => group.map((product) => <Product key={product.id} product={product} />))}</div>
      {isFetching ? <p>Loading...</p> : null}
      {hasNextPage && !isFetching ? (
        <button onClick={fetchNextPage}>Load more</button>
      ) : null}
    </div>
  );
}

export default ProductList;