export type Restaurant = {
  id: number;
  name: string;
  category?: string;
  star?: number;
  averageRating?: number;
  place?: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  distance?: number;
  logo?: string;
  images?: string[];
  totalMenus?: number;
  totalReviews?: number;
  menus?: Menu[];
  reviews?: Review[];
};

export type Menu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image?: string;
};

export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
};
