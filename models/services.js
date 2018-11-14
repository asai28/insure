module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        startDate: DataTypes.DATE,
        companyName: DataTypes.STRING,
        country: {
            type: DataTypes.STRING,
            defaultValue : "United States",
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producer: {
            type: DataTypes.STRING
        },
        contactPhone: DataTypes.STRING,
        contactCellPhone: DataTypes.STRING,
        contactEmail: DataTypes.STRING,
        state: {
            type: DataTypes.STRING,
            defaultValue : "Arizona",
            allowNull: false
        },
        streetAddress: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING,
        contactStreetAddress : DataTypes.STRING,
        contactZip : DataTypes.STRING,
        contactCountry: {
            type: DataTypes.STRING,
            defaultValue : "United States",
            allowNull: false 
        },
        contactState: DataTypes.STRING,
        contactCity: DataTypes.STRING,
        equipmentsSelectedSite: DataTypes.TEXT,
        equipmentsSelectedTraining: DataTypes.TEXT,
    });
    return Service;
  };
  