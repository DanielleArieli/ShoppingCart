import Product from '../models/Product';

class ProductRepository {
  public async findAll(): Promise<Product[]> {
    return await Product.findAll();
  }

  public async findBySku(sku: number): Promise<Product | null> {
    return await Product.findByPk(sku);
  }

  public async create(product: Product): Promise<Product> {
    return await Product.create(product);
  }

  public async update(sku: number, product: Partial<Product>): Promise<[number]> {
    return await Product.update(product, {
      where: { sku: sku },
    });
  }

  public async delete(sku: number): Promise<number> {
    return await Product.destroy({
      where: { sku: sku },
    });
  }
}

export default new ProductRepository();
