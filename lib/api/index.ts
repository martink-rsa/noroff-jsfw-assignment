import { cache } from 'react';

import axios, { AxiosError } from 'axios';

import { ApiResponse, Product, User } from '../types';

const BASE_URL = 'https://v2.api.noroff.dev';
const SHOP_URL = `${BASE_URL}/online-shop`;
const AUTH_URL = `${BASE_URL}/auth`;

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const createApi = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (typeof window !== 'undefined') {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<unknown>) => {
      const status = error.response?.status || 500;
      const errorData = error.response?.data as Record<string, unknown> | undefined;
      const message = 
        errorData && typeof errorData === 'object' && 'message' in errorData && typeof errorData.message === 'string' 
          ? errorData.message 
          : error.message || 'An unexpected error occurred';
      const data = error.response?.data;

      throw new ApiError(message, status, data);
    },
  );

  return instance;
};

export const api = createApi();

export const getProducts = cache(async () => {
  try {
    const response = await fetch(`${SHOP_URL}`, {
      next: {
        tags: ['products'],
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(errorData?.message || 'Failed to fetch products', response.status, errorData);
    }

    const data: ApiResponse<Product[]> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Failed to fetch products', 500);
  }
});

export const getProductById = cache(async (id: string) => {
  try {
    const response = await fetch(`${SHOP_URL}/${id}`, {
      next: {
        tags: [`product-${id}`],
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(errorData?.message || `Failed to fetch product with ID: ${id}`, response.status, errorData);
    }

    const data: ApiResponse<Product> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : `Failed to fetch product with ID: ${id}`, 500);
  }
});

export const searchProducts = cache(async (query: string) => {
  try {
    const response = await fetch(`${SHOP_URL}?q=${encodeURIComponent(query)}`, {
      next: { tags: ['products'] },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(errorData?.message || 'Failed to search products', response.status, errorData);
    }

    const data: ApiResponse<Product[]> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error instanceof Error ? error.message : 'Failed to search products', 500);
  }
});

export const authApi = {
  register: async (data: Omit<User, 'accessToken'>) => {
    try {
      const response = await api.post<ApiResponse<User>>(`${AUTH_URL}/register`, data);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error instanceof Error ? error.message : 'Failed to register', 500);
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post<ApiResponse<User>>(`${AUTH_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error instanceof Error ? error.message : 'Failed to login', 500);
    }
  },
};
