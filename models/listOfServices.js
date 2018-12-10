module.exports = function(sequelize, DataTypes) {
    var ListOfServices = sequelize.define("ListOfServices", {
        service: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 100.00
        },
        description: {
            type: DataTypes.TEXT
        }          
    });
    return ListOfServices;
  };
  