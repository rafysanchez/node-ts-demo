import { describe, it, expect, beforeEach } from 'vitest';
import { ProductService } from '../src/modules/products/services/ProductService';
import { InMemoryProductRepository } from '../src/modules/products/repositories/InMemoryProductRepository';

describe('ProductService', () => {
  let service: ProductService;
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
    service = new ProductService(repository);
  });

  it('should list all products (default seed is 10)', async () => {
    const result = await service.getAll({ page: 1, pageSize: 10 });
    expect(result.products.length).toBe(10);
    expect(result.total).toBe(10);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Test Product',
      price: 99.99,
      active: true,
    };
    const created = await service.create(newProduct);

    expect(created.id).toBeDefined();
    expect(created.name).toBe(newProduct.name);
    
    const all = await service.getAll({ page: 1, pageSize: 100 });
    expect(all.total).toBe(11);
  });

  it('should throw 404 if product not found', async () => {
    await expect(service.getById('non-existent-id')).rejects.toThrow('Product not found');
  });
});