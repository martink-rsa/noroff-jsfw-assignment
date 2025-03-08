export interface Media {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: Media;
  rating: number;
  tags: string[];
  reviews: Review[];
}

export interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager?: boolean;
  accessToken?: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    isFirstPage?: boolean;
    isLastPage?: boolean;
    currentPage?: number;
    previousPage?: number | null;
    nextPage?: number | null;
    pageCount?: number;
    totalCount?: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
