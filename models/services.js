const uuid = require('uuid/v4'); // ES5

'use strict';
module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        quoteNumber: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
          },
        startDate: DataTypes.DATE,
        validThru: DataTypes.DATE,
        companyName: DataTypes.STRING,
        paymentBy: DataTypes.STRING,
        producer: {
            type: DataTypes.STRING
        },
        contactPerson: DataTypes.STRING,
        contactPhone: DataTypes.STRING,
        contactCellPhone: DataTypes.STRING,
        contactEmail: DataTypes.STRING,
        contactStreetAddress: DataTypes.STRING,
        contactCity: DataTypes.STRING,
        contactZip: DataTypes.STRING,
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
        instructions: DataTypes.TEXT,
        quotationIssuedBy: DataTypes.STRING,
        additionalEquipment: DataTypes.STRING
    });
    return Service;
  };
  