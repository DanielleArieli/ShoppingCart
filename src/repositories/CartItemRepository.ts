import CartItem from '../models/CartItem';
import sequelize from '../config/database';
import { Op, QueryTypes } from 'sequelize';

class CartItemRepository {
  public async findAll(): Promise<CartItem[]> {
    return await CartItem.findAll();
  }

  public async findById(id: number): Promise<CartItem | null> {
    return await CartItem.findByPk(id);
  }

  public async findByUser(user_id: number): Promise<CartItem[] | null> {
    return await CartItem.findAll({ where: { user_id: user_id } });
  }

  public async findByProduct(product_id: number): Promise<CartItem[] | null> {
    return await CartItem.findAll({ where: { product_id: product_id } });
  }

  public async findByUserAndProduct(user_id: number, product_id: number): Promise<CartItem | null> {
    return await CartItem.findOne({ where: { [Op.and]: [{user_id: user_id},
                                                       {product_id: product_id}] } });
  }

  public async create(cart_item: CartItem): Promise<CartItem> {
    return await CartItem.create(cart_item);
  }

  public async update(id: number, cart_item: Partial<CartItem>): Promise<[number]> {
    return await CartItem.update(cart_item, {
      where: { id: id },
    });
  }

  public async delete(id: number): Promise<number> {
    return await CartItem.destroy({
      where: { id: id },
    });
  }

  public async deleteByUser(user_id: number): Promise<number> {
    return await CartItem.destroy({
      where: { user_id: user_id },
    });
  }

  public async deleteByProduct(product_id: number): Promise<number> {
    return await CartItem.destroy({
      where: { product_id: product_id },
    });
  }

  public async deleteByUserAndProduct(user_id: number, product_id: number): Promise<number> {
    return await CartItem.destroy({ where: { [Op.and]: [{user_id: user_id},
                                                       {product_id: product_id}] } });
  }

}

export default new CartItemRepository();
