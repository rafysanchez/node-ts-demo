import { describe, it, expect, beforeEach } from 'vitest';
import { ProductService } from '../src/modules/products/services/ProductService';
import { InMemoryProductRepository } from '../src/modules/products/repositories/InMemoryProductRepository';

describe('ProductService', () => {
  let service: ProductService;
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    // Resets the repository before each test to ensure a clean state (default 10 seeded items)
    repository = new InMemoryProductRepository();
    service = new ProductService(repository);
  });

  it('should list all products (default seed is 10)', async () => {
    const result = await service.getAll({ page: 1, pageSize: 10 });
    expect(result.products.length).toBe(10);
    expect(result.total).toBe(10);
  });

  it('should get a product by id', async () => {
    // Get the first available product to test retrieval
    const list = await service.getAll({ page: 1, pageSize: 1 });
    const existing = list.products[0];

    const result = await service.getById(existing.id);
    expect(result).toBeDefined();
    expect(result.id).toBe(existing.id);
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

  it('should update a product', async () => {
    // Get a product to update
    const list = await service.getAll({ page: 1, pageSize: 1 });
    const target = list.products[0];

    const updates = { name: 'Updated Name', price: 150.0 };
    const updated = await service.update(target.id, updates);

    expect(updated).not.toBeNull();
    expect(updated?.name).toBe(updates.name);
    expect(updated?.price).toBe(updates.price);
    // Ensure other fields are preserved
    expect(updated?.active).toBe(target.active);
  });

  it('should delete a product', async () => {
    // Get a product to delete
    const list = await service.getAll({ page: 1, pageSize: 1 });
    const target = list.products[0];

    const result = await service.delete(target.id);
    expect(result).toBe(true);

    // Verify it's gone
    await expect(service.getById(target.id)).rejects.toThrow('Product not found');
    
    const all = await service.getAll({ page: 1, pageSize: 100 });
    expect(all.total).toBe(9);
  });

  it('should throw 404 if product not found', async () => {
    await expect(service.getById('non-existent-id')).rejects.toThrow('Product not found');
  });
});