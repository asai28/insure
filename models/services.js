module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        startDate: DataTypes.DATE,
        companyName: DataTypes.STRING,
        country: {
            type: DataTypes.STRING,
            defaultValue : "United States",
            allowNull: false
        },
        service: {
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
        Laptop: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        projectorScreen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Table:  {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        trainingKit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        forkliftTrainingKit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        CPRmannequins : {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        firstAidAEDKit:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        RespiratorFitTestKit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        instructions: DataTypes.TEXT
    });
    return Service;
  };
  