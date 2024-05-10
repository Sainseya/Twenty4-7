// Interface for the 'catalog' table
export interface Catalog {
    id: number;
    type: string;
    bio?: string | null;
}

// Interface for the 'user' table
export interface User {
    id: number;
    firstname: string;
    username: string;
    password: string;
    lastname: string;
    role: string;
    email: string;
    wallet?: number | null;
    bio?: string | null;
    created_at: string;
}

// Interface for the 'product' table
export interface Product {
    [x: string]: any;
    id: number;
    name: string;
    description?: string | null;
    status: string;
    quantity: number;
    photo?: string | null;
    price: number;
    created_at: string;
    category: Catalog;
}

// Interface for the 'cart' table
export interface Cart {
    id: number;
    creation_date: string;
    order?: Order | null;
    user?: User | null;
}

// Interface for the 'order' table
export interface Order {
    id: number;
    total_price: number;
    creation_date: string;
    is_delivered: boolean;
    user?: User | null;
    cart?: Cart | null;
}

// Interface for the 'order_product' table
export interface OrderProduct {
    id: number;
    quantity: number;
    order?: Order | null;
    product?: Product | null;
}

// Interface for the 'cart_product' table
export interface CartProduct {
    [x: string]: any;
    id: number;
    quantity: number;
    cart?: Cart | null;
    product: Product;
}

//! test
export interface CartProductData {
  cart_products: CartProduct[];
}
