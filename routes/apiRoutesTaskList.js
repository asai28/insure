var db = require("../models");

// // This may be confusing but here Sequelize (capital) references the standard library
// // sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../models");
var Op = db.Sequelize.options
var url = require('url');

module.exports = function(app) {

    //all employee tasks
    app.get("/api/tasklist", function(req, res){
        // Get all quotes which approved or not seen yet
         db.TaskList.findAll({
             
         })
         .then(function(service){
             console.log(req.params.emp);
             console.log(service)
             res.json(service)
         });
    });

    //filter employee tasks
    app.get("/api/tasklist/sortBy", function(req, res){
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log("----------------------------------------------------------\n");
        console.log(query)
        console.log("-----------------------------------------------------------\n");
        // Get all quotes which approved or not seen yet
         db.TaskList.findAll({
             where: {
                 quotationIssuedBy: query.quotationIssuedBy,
                 quoteApproved: query.quoteApproved,
                 completed: query.completed
             }
         })
         .then(function(service){
             console.log(query);
             res.json(service)
         });
    });

    app.get("/api/tasklist/:emp", function(req, res){
       // Get all quotes which approved or not seen yet
        db.TaskList.findAll({
            where: {
                quotationIssuedBy: req.params.emp,  
                quoteApproved: true,
                completed: false
            }
        })
        .then(function(service){
            console.log(req.params.emp);
            console.log(service)
            res.json(service)
        });
   });

   app.get("/api/tasklist/:emp/completed", function(req, res){
    console.log(db.Sequelize.options);
     db.TaskList.findAll({
         where: {
             quotationIssuedBy: req.params.emp,  
             completed: true
         }
     })
     .then(function(service){
         console.log("heyoo");
         console.log(req.params.emp);
         console.log(service)
         res.json(service)
     });
});

app.get("/api/tasklist/:emp/incomplete", function(req, res){
    console.log(db.Sequelize.options);
     db.TaskList.findAll({
         where: {
             quotationIssuedBy: req.params.emp,  
             completed: false
         }
     })
     .then(function(service){
         console.log("heyoo");
         console.log(req.params.emp);
         console.log(service)
         res.json(service)
     });
});

app.get("/api/tasklist/:emp/incompleteNull", function(req, res){
    console.log(db.Sequelize.options);
     db.TaskList.findAll({
         where: {
             quotationIssuedBy: req.params.emp,  
             completed: null
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

   //Update entire task
   app.put("/api/tasklist/:id", function(req,res){
    db.TaskList.update(
        {
            service: req.body.service,
            client: req.body.client,
            dateAssigned: req.body.dateAssigned, 
            dueDate: req.body.dueDate,
            qty: req.body.qty,
            quoteApproved: req.body.quoteApproved,
            dateCompleted: req.body.dateCompleted,
            details: req.body.details,
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

   app.post("/api/taskList", function(req, res){
    db.TaskList.create({
        quotationIssuedBy: req.body.quotationIssuedBy,
        quotationNumber: req.body.quotationNumber,
        service: req.body.service,
        client: req.body.client,
        details: req.body.instructions,
        dateAssigned: req.body.startDate, //sort
        dueDate: req.body.validThru,
        qty: req.body.qty,
        dateCompleted: req.body.dateCompleted,
        status_notes_comments: req.body.comments,
        serviceDescription: req.body.serviceDescription,
        quoteApproved: req.body.quoteApproved,
        completed: req.body.completed
    }).then(function(task) {
      res.json(task);
    });
});

app.delete("/api/tasklist/:id", function(req,res){
    db.TaskList.destroy(
        {
        where: {
            id: req.params.id
        }
        // },
        // truncate: true
    }).on('success', function() { console.log("Deleted sucessfully") })
    .then(function(service){
        console.log("heyoo");
        console.log(req.query.id);
        console.log(service)
        res.json(service)
    });
});
}


