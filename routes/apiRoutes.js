var db = require("../models/");

module.exports = function(app) {
    // GET route for getting all of the services
    app.get("/api/services", function(req, res){
        db.Service.findAll({})
        .then(function(service){
            console.log(service)
            res.json(service)
        });
    });

    // POST route for saving a new service
  app.post("/api/services", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Service.create({
        startDate: req.body.startDate,
        companyName: req.body.companyName,
        country: req.body.country,
        topic: req.body.topic,
        contactPhone: req.body.contactPhone,
        contactCellPhone: req.body.contactCellPhone,
        contactEmail: req.body.contactEmail,
        state: req.body.state,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        zip: req.body.zip,
        contactStreetAddress : req.body.contactStreetAddress,
        contactZip : req.body.contactZip,
        contactCountry: req.body.contactCountry,
        contactState: req.body.contactState,
        contactCity: req.body.contactCity,
        equipmentsSelectedSite: req.body.equipmentsSelectedSite,
        equipmentsSelectedTraining: req.body.equipmentsSelectedTraining
    }).then(function(service) {
        console.log("Posted", service.get({
            plain: true
          }))
      res.json(service);
    });
  });

}