module.exports = function(sequelize, DataTypes) {
    var Equipment = sequelize.define("EquipmentVsTopic", {
        serviceUnits: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0
        },
        topic:{
            type: DataTypes.STRING
        },
        costOfService: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 100.00
        },
        DurationInMin: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        RespiratorFitTestKit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Handouts: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        MaterialFilePath: {
            type: DataTypes.STRING
        },
        "PowerPointName": {
            type: DataTypes.STRING
        },
        "HandoutFilepath": {
            type: DataTypes.STRING
        }
    });
    return Equipment;
  };
  