import ProductRepository from '../repositories/ProductRepository';
import Product from '../models/Product';

class ProductService {
  public async getAllProducts(): Promise<Product[]> {
    return await ProductRepository.findAll();
  }

  public async getProductBySku(sku: number): Promise<Product | null> {
    return await ProductRepository.findBySku(sku);
  }

  public async createProduct(product: Product): Promise<Product> {
    return await ProductRepository.create(product);
  }

  public async updateProduct(sku: number, product: Partial<Product>): Promise<[number]> {
    return await ProductRepository.update(sku, product);
  }

  public async deleteProduct(sku: number): Promise<number> {
    return await ProductRepository.delete(sku);
  }
}

export default new ProductService();
