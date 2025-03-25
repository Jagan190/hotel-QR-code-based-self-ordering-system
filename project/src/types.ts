export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  cuisine: 'southIndian' | 'mangalorean' | 'chinese';
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  contactNumber: string;
  tableNumber: string;
}