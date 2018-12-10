module.exports = function(sequelize, DataTypes) {
    var CompanyHasEquipment = sequelize.define("CompanyHasEquipment", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        Handouts: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }          
    });
    return CompanyHasEquipment;
  };
  