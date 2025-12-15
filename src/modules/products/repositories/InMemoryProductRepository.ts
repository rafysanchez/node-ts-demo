import { IProductRepository } from './IProductRepository';
import { Product } from '../schemas/product.schema';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    for (let i = 1; i <= 10; i++) {
      const now = new Date().toISOString();
      this.products.push({
        id: uuidv4(),
        name: `Product ${i}`,
        price: i * 100 + 50, // 150, 250, etc.
        active: i % 2 === 0,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  async findAll(params: { q?: string; page: number; pageSize: number }): Promise<{ products: Product[]; total: number }> {
    let filtered = this.products;

    if (params.q) {
      const search = params.q.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search));
    }

    const total = filtered.length;
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;
    const products = filtered.slice(start, end);

    return { products, total };
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  async create(data: Product): Promise<Product> {
    this.products.push(data);
    return data;
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length !== initialLength;
  }
}