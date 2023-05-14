import { Schema, model } from 'mongoose';

// User model
interface User {
  name: string;
  email: string;
  password: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
});

export const UserModel = model<User>('User', userSchema);

// Product model
interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

export const ProductModel = model<Product>('Product', productSchema);

// Cart model
interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
  //@ts-ignore
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema<Cart>({
  //@ts-ignore
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

export const CartModel = model<Cart>('Cart', cartSchema);
