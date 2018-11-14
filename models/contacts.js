module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define("Contact", {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactName: {
            type: DataTypes.STRING
        },
        contactEmail: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        contactOfficePhone: {
            type: DataTypes.STRING
        },
        contactMobilePhone: {
            type: DataTypes.STRING
        },
        contactAlternateMobilePhone: {
            type: DataTypes.STRING
        },
        contactIsMain: {
            type: DataTypes.BOOLEAN
        }          
    });
    return Contact;
  };
  