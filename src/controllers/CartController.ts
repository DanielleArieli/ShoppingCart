import { Request, Response } from 'express';
import CartService from '../services/CartService';
import { log } from 'console';

// Get the user's cart
export const viewCart = async (req: Request, res: Response): Promise<void> => {
    const user_id = parseInt(req.query.user_id as string);
    try {
        const cart = await CartService.viewCart(user_id);
        res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve cart', error });
  }
};

// Delete a product from a user's cart
export const deleteProductFronCart = async (req: Request, res: Response): Promise<void> => {
    const user_id = parseInt(req.body.user_id);
    const product_id = parseInt(req.body.product_id);

    try {
        const deleted_product = await CartService.deleteProductFronCart(user_id, product_id);

        if(deleted_product) {
            res.status(204).send();
        } else {
          res.status(500).json({ message: 'Product not found' });
        }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product from cart', error });
  }
};

// Add a product to the cart
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await CartService.addToCart(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart', error });
  }
};

// Update cart
export const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = parseInt(req.body.user_id);
    const product_id = parseInt(req.body.product_id);
    const new_quantity = parseInt(req.body.new_quantity);

    const updateProduct = await CartService.modifyQuantityOfProduct(user_id, product_id, new_quantity);
    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart', error });
  }
};