"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class refresh_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      refresh_tokens.belongsTo(models.users, {
        foreignKey: "user_Id",
      });
    }
  }
  refresh_tokens.init(
    {
      token: DataTypes.STRING,
      user_Id: DataTypes.INTEGER,
      expiryDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "refresh_tokens",
    }
  );
  return refresh_tokens;
};
