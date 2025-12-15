import { IProductRepository } from '../repositories/IProductRepository';
import { CreateProductInput, UpdateProductInput, Product } from '../schemas/product.schema';
import { AppError } from '../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAll(params: { q?: string; page: number; pageSize: number }) {
    return this.productRepository.findAll(params);
  }

  async getById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async create(input: CreateProductInput) {
    const now = new Date().toISOString();
    const newProduct: Product = {
      id: uuidv4(),
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    return this.productRepository.create(newProduct);
  }

  async update(id: string, input: UpdateProductInput) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const updatedData = {
      ...input,
      updatedAt: new Date().toISOString(),
    };

    return this.productRepository.update(id, updatedData);
  }

  async delete(id: string) {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new AppError('Product not found', 404);
    }
    return true;
  }
}