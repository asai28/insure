module.exports = function(sequelize, DataTypes) {
    var Company = sequelize.define("Company", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producer: {
            type: DataTypes.STRING
        },
        agency: {
            type: DataTypes.STRING
        },
        contract_client: {
            type: DataTypes.BOOLEAN
        }          
    });
    return Company;
  };
  