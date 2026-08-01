// getProducts(), getProductById()
// src/api/products.ts
import productsData from "../resources/data/products.json";
import type { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  // later: return client.get('/products')
  return Promise.resolve(productsData as Product[]);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
