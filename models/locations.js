module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactStreetAddress: {
            type: DataTypes.STRING
        },
        contactCity: {
            type: DataTypes.STRING
        },
        contactState: {
            type: DataTypes.STRING
        },
        contactZIP: {
            type: DataTypes.STRING
        },
        contactCountry: {
            type: DataTypes.STRING
        },
        contactIsMainLocation: {
            type: DataTypes.BOOLEAN
        }          
    });
    return Location;
  };
  