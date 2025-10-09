// src/services/SearchService.js

import axios from 'axios';
import { AiSuggestion, SearchParams } from '../shared/types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class SearchService {
  private axiosInstance = axios.create({
    baseURL: API_URL,
  });

  async smartSearch(query: string): Promise<AiSuggestion[]> {
    const params: SearchParams = { query };
    return this.axiosInstance.get('/api/search', { params }).then(response => response.data);
  }
}

export const searchService = new SearchService();