export interface userUpdate {
    fullName: string;
    email: string; // Không được thay đổi
    phone: string;
    city: string;
    district: string;
    dateOfBirth: string;
    avatarUrl: string;
};


export interface FavoriteField {
  fieldId: number;
  fieldName: string;
  address: string;
  averageRating: number;
}

export interface FavoritesResponse {
  data: FavoriteField[];
  total: number;
  page: number;
  pageSize: number;
}
