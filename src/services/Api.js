// src/services/Api.js
import axios from 'axios';
import { IResponse } from './IResponse';

interface IApiConfig {
  url: string;
  method: string;
}

class Api {
  private baseUrl: string;
  private headers: any;

  constructor(baseUrl: string = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /**
   * Perform a GET request to the specified endpoint.
   *
   * @param endpoint The endpoint to fetch.
   * @param config The request configuration.
   * @returns A promise that resolves to the server response.
   */
  async get(endpoint: string, config: IApiConfig = {}): Promise<IResponse> {
    const response = await axios.get(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...config,
    });
    return this.convertResponse(response);
  }

  /**
   * Perform a POST request to the specified endpoint.
   *
   * @param endpoint The endpoint to send data to.
   * @param data The data to send.
   * @param config The request configuration.
   * @returns A promise that resolves to the server response.
   */
  async post(endpoint: string, data: any, config: IApiConfig = {}): Promise<IResponse> {
    const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
      headers: this.headers,
      ...config,
    });
    return this.convertResponse(response);
  }

  /**
   * Perform a PUT request to the specified endpoint.
   *
   * @param endpoint The endpoint to send data to.
   * @param data The data to send.
   * @param config The request configuration.
   * @returns A promise that resolves to the server response.
   */
  async put(endpoint: string, data: any, config: IApiConfig = {}): Promise<IResponse> {
    const response = await axios.put(`${this.baseUrl}${endpoint}`, data, {
      headers: this.headers,
      ...config,
    });
    return this.convertResponse(response);
  }

  /**
   * Perform a DELETE request to the specified endpoint.
   *
   * @param endpoint The endpoint to delete.
   * @param config The request configuration.
   * @returns A promise that resolves to the server response.
   */
  async delete(endpoint: string, config: IApiConfig = {}): Promise<IResponse> {
    const response = await axios.delete(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      ...config,
    });
    return this.convertResponse(response);
  }

  private convertResponse(response: any): IResponse {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  }
}

// Export the new instance of the Api class
export default new Api();