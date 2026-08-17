export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  year: number;
  director: string;
  genres: string[];
  posterUrl: string;
  averageRating: number;
  ratingCount: number;
  synopsis: string;
  userRating?: number;
  watched?: boolean;
  pending?: boolean;
  review?: string;
  watchedDate?: string;
  favorite?: boolean;
}