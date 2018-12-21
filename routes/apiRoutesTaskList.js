var db = require("../models");

module.exports = function(app) {
   app.get("/api/tasklist/:emp", function(req, res){
        db.TaskList.findAll({
            where: {
                quotationIssuedBy: req.params.emp,
            },
            order: [
                ['service', 'ASC']
            ]
        })
        .then(function(service){
            console.log("heyoo");
            console.log(req.query.emp);
            console.log(service)
            res.json(service)
        });
   });

   app.put("/api/tasklist?quotationIssuedBy=:quotationIssuedBy&quotationNumber=:quotationNumber&service=:service", function(req,res){
        db.TaskList.update({
            quotationIssuedBy: req.body.quotationIssuedBy,
            quotationNumber: req.body.quotationNumber,
            service: req.body.service
        }).then(function(service){
            console.log("heyoo");
            console.log(req.query.emp);
            console.log(service)
            res.json(service)
        });
   });
}


