var db = require("../models");

module.exports = function(app) {
   app.get("/api/tasklist/:emp", function(req, res){
        db.TaskList.findAll({
            where: {
                quotationIssuedBy: req.params.emp,
            }
        })
        .then(function(service){
            console.log("heyoo");
            console.log(req.params.emp);
            console.log(service)
            res.json(service)
        });
   });

   //sort field ascending or descending
   app.get("/api/tasklist/:emp/sort/:field/:order", function(req, res){
       db.TaskList.findAll({
           where: {
            quotationIssuedBy: req.params.emp
           },
           order: [
               [req.params.field, req.params.order]
           ]

       })
    
   })

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


