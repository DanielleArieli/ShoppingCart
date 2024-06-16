import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../config/database';

interface ProductAttributes {
    sku: number;
    selling_price: number;
    stock_quantity: number;
    expiration_date?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'sku' | 'expiration_date'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public sku!: number;
  public selling_price!: number;
  public stock_quantity!: number;
  public expiration_date?: Date;
}

Product.init(
  {
    sku: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    selling_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: false, // Disable createdAt and updatedAt
  }
);

export default Product;
