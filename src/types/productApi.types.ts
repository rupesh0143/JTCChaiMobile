export interface ProductApiItem {
  ID: number;
  Item_code: string;
  Item_desc: string;
  Prize: number;
  Original_Price: number;
  Item_Weight: number;
  ItemImage: string;
  stars: number;
  TotalCount: number;
  Category: string;
}

export interface ProductsPageResponse {
  success: boolean;
  message: string;
  data: ProductApiItem[];
  totalCount: number;
}