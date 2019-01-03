'use strict';

module.exports = function(sequelize, DataTypes) {
    var TaskList = sequelize.define("TaskList", {
        quotationIssuedBy: DataTypes.STRING,
        quotationNumber: {
        type: DataTypes.UUID,
        primaryKey: false
        },
        service: {//sort
            type: DataTypes.STRING
        },
        client: {//sort
            type: DataTypes.STRING,
        },
        details: {
            type: DataTypes.TEXT,
        },
        dateAssigned: DataTypes.DATE, //sort
        dueDate: DataTypes.DATE,
        qty: {
            type: DataTypes.FLOAT,
            defaultValue: 0.00
        },
        dateCompleted: {//sort
            type: DataTypes.DATE
        },
        status_notes_comments: DataTypes.TEXT,
        serviceDescription: {
            type: DataTypes.TEXT
        },
        quoteApproved: {
            type: DataTypes.BOOLEAN
        },
        completed: {
            type: DataTypes.BOOLEAN
        }
    });
    return TaskList;
  };
  