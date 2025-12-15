import { NextFunction } from 'express';
import { ProductService } from '../services/ProductService';
import { CreateProductSchema, UpdateProductSchema, ProductQuerySchema } from '../schemas/product.schema';

export class ProductController {
  constructor(private productService: ProductService) {}

  getAll = async (req: any, res: any, next: NextFunction) => {
    try {
      const query = ProductQuerySchema.parse(req.query);
      const result = await this.productService.getAll(query);
      res.json({
        success: true,
        data: result.products,
        meta: {
          total: result.total,
          page: query.page,
          pageSize: query.pageSize,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: any, res: any, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getById(id);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: any, res: any, next: NextFunction) => {
    try {
      const body = CreateProductSchema.parse(req.body);
      const product = await this.productService.create(body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: any, res: any, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = UpdateProductSchema.parse(req.body);
      // PUT implies full replacement usually, but for simplicity we'll treat as merge or strict check. 
      // User asked for PATCH as well. Let's assume PUT replaces what's provided but validates strictness if needed.
      // For this simple example, we forward to service update which merges partials.
      const product = await this.productService.update(id, body);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  patch = async (req: any, res: any, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = UpdateProductSchema.parse(req.body);
      const product = await this.productService.update(id, body);
      res.json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: any, res: any, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.productService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}