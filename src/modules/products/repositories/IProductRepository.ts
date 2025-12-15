import { Product, CreateProductInput, UpdateProductInput } from '../schemas/product.schema';

export interface IProductRepository {
  findAll(query: { q?: string; page: number; pageSize: number }): Promise<{ products: Product[]; total: number }>;
  findById(id: string): Promise<Product | null>;
  create(data: Product): Promise<Product>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}