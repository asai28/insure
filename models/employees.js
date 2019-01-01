module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        EMP_NAME: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EMAIL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EMP_ROLE: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EMP_STATUS: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PRIORITY: {
            type: DataTypes.INTEGER
        }
    });
    return Employee;
  };
  