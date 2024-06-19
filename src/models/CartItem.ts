import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../config/database';

interface CartItemAttributes {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cart_items',
    timestamps: false, // Disable createdAt and updatedAt
  }
);

export default CartItem;
