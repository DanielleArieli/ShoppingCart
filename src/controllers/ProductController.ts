import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error });
  }
};

// Get product by SKU
export const getProductBySku = async (req: Request, res: Response): Promise<void> => {
  const productSku = parseInt(req.query.sku as string);
  try {
    const product = await ProductService.getProductBySku(productSku);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product', error });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productSku = parseInt(req.query.sku as string);

  try {
    const updateProduct = await ProductService.updateProduct(productSku, req.body);
    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productSku = parseInt(req.query.sku as string);

  try {
    const deletedProduct = await ProductService.deleteProduct(productSku);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};
