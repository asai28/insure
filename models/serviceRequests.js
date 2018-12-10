module.exports = function(sequelize, DataTypes) {
    var ServiceRequests = sequelize.define("ServiceRequests", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER
        },
        billable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        alternateName: {
            type: DataTypes.STRING,
        },
        cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00
        }          
    });
    return ServiceRequests;
  };
  