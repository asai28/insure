var db = require("../models");

// // This may be confusing but here Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../models");


module.exports = function(app) {
   app.get("/api/tasklist/:emp", function(req, res){
        db.TaskList.findAll({
            where: {
                quotationIssuedBy: req.params.emp,
                [db.Op.or]: [{quoteApproved: true}, {quoteApproved: null}]
            }
        })
        .then(function(service){
            console.log("heyoo");
            console.log(req.params.emp);
            console.log(service)
            res.json(service)
        });
   });

   app.put("/api/tasklist/:id", function(req,res){
        db.TaskList.update(
            {
                quoteApproved: req.body.quoteApproved,
                dateCompleted: req.body.dateCompleted,
                status_notes_comments: req.body.status_notes_comments,
                completed: req.body.completed
            },
            {where: {
                id: req.params.id
            }
        }).then(function(service){
            console.log("heyoo");
            console.log(req.query.id);
            console.log(service)
            res.json(service)
        });
   });
}


