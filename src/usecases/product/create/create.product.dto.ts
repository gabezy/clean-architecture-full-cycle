export interface InputCreateProductDTO {
  type: 'a' | 'b';
  name: string;
  price: number;
}

export interface OutputCreateProductDTO { 
  id: string;
  name: string;
  price: number;
}