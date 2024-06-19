import ProductRepository from '../repositories/ProductRepository';
import CartItemRepository from '../repositories/CartItemRepository';
import CartItem from '../models/CartItem';


class CartService {
  public async addToCart(new_item: CartItem): Promise<CartItem | Error> {
    const product = await ProductRepository.findBySku(new_item.product_id);

    if(product !== null) {
      if (product.stock_quantity >= new_item.quantity && product.stock_quantity >= 0) {
        product.stock_quantity -= new_item.quantity;
        await ProductRepository.update(new_item.product_id, product);
        
        let cart_item = await CartItemRepository.findByUserAndProduct(new_item.user_id, new_item.product_id);

          if(cart_item !== null) {
              cart_item.quantity += new_item.quantity;
              await CartItemRepository.update(cart_item.id, cart_item);
              return cart_item;
          }
          return await CartItemRepository.create(new_item);
      }
        return Error("Stock is not sufficient");
    }
    return Error("Product not found");
  }

  public async viewCart(user_id: number): Promise<CartItem[] | null> {
    return await CartItemRepository.findByUser(user_id);
  } 
  public async modifyQuantityOfProduct(user_id: number, product_id: number, new_quantity:number): Promise<[number] | Error> {
    const product = await ProductRepository.findBySku(product_id);
    const cart_item = await CartItemRepository.findByUserAndProduct(user_id, product_id);

    if(product !== null && cart_item !== null) {
      const delta = new_quantity - cart_item.quantity;
      
      if (product.stock_quantity >= delta && new_quantity >= 0) {
        product.stock_quantity -= delta;
        await ProductRepository.update(product_id, product);
        cart_item.quantity = new_quantity;
        return await CartItemRepository.update(cart_item.id, cart_item);
      }
      return Error("Stock is not sufficient");
    }
    return Error("Product not found");
  }
  
  public async deleteProductFronCart(user_id: number, product_id: number): Promise<number> {
    const product = await ProductRepository.findBySku(product_id);
    const cart_item = await CartItemRepository.findByUserAndProduct(user_id, product_id);

    if(product !== null && cart_item !== null) {
      product.stock_quantity -= cart_item.quantity;
      await ProductRepository.update(product_id, product);
    }
    return await CartItemRepository.deleteByUserAndProduct(user_id, product_id);
  }
}

export default new CartService();
