var db = require("../models");

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
        validThru: req.body.validThru,
        companyName: req.body.companyName,
        paymentBy: req.body.paymentBy,
        producer: req.body.producer,
        contactPerson: req.body.contactPerson,
        contactPhone: req.body.contactPhone,
        contactCellPhone: req.body.contactCellPhone,
        contactEmail: req.body.contactEmail,
        contactStreetAddress : req.body.contactStreetAddress,
        contactZip : req.body.contactZip,
        contactCountry: req.body.contactCountry,
        contactState: req.body.contactState,
        contactCity: req.body.contactCity,
        Laptop: req.body.Laptop,
        projectorScreen: req.body.projectorScreen,
        Table: req.body.Table,
        trainingKit: req.body.trainingKit,
        forkliftTrainingKit: req.body.forkliftTrainingKit,
        CPRmannequins : req.body.CPRmannequins,
        firstAidAEDKit:req.body.firstAidAEDKit,
        RespiratorFitTestKit: req.body.RespiratorFitTestKit,
        instructions: req.body.instructions,
        quotationIssuedBy: req.body.quotationIssuedBy,
        additionalEquipment: req.body.additionalEquipment
    }).then(function(service) {
      res.json(service);
    });
  });

app.get("/api/employees", function(req, res){

    db.Employee.findAll({})
    .then(function(employee){
        res.json(employee)
    });
});

app.get("/api/contacts", function(req, res){

    db.Contact.findAll({})
    .then(function(contact){
        res.json(contact)
    });
});


app.get("/api/locations", function(req, res){

    db.Location.findAll({})
    .then(function(location){
        res.json(location)
    });
});

app.get("/api/companies", function(req, res){

    db.Company.findAll({})
    .then(function(company){
        res.json(company)
    });
});

app.get("/api/companiesEquipments", function(req, res){

    db.CompanyHasEquipment.findAll({})
    .then(function(equipments){
        res.json(equipments)
    });
});

app.get("/api/companiesEquipments/:companyName", function(req, res){

    db.CompanyHasEquipment.findAll({
        where: {
            companyName: req.params.companyName
        }
    })
    .then(function(equipments){
        res.json(equipments)
    });
});

app.get("/api/topics", function(req, res){

    db.EquipmentVsTopic.findAll({})
    .then(function(equipments){
        res.json(equipments)
    });
});


app.post("/api/companiesEquipments", function(req, res){

    db.CompanyHasEquipment.create({
        companyName: req.body.companyName,
        Laptop: req.body.Laptop,
        projectorScreen: req.body.projectorScreen,
        Table: req.body.Table,
        trainingKit: req.body.trainingKit,
        forkliftTrainingKit: req.body.forkliftTrainingKit,
        CPRmannequins : req.body.CPRmannequins,
        firstAidAEDKit:req.body.firstAidAEDKit,
        Handouts: req.body.Handouts
    }).then(function(equipments) {
      res.json(equipments);
    });
});


app.post("/api/employees", function(req, res){
    db.Employee.create({
        EMP_NAME: req.body.EMP_NAME,
        EMAIL: req.body.EMAIL,
        EMP_STATUS: req.body.EMP_STATUS,
        PASSWORD: req.body.PASSWORD
    }).then(function(employee) {
      res.json(employee);
    });
});

app.post("/api/companies", function(req, res){
    db.Company.create({
        companyName: req.body.newCompanyName,
        producer:   req.body.newProducer,
        agency: req.body.newAgency,
        contract_client: req.body.newContractClient
    }).then(function(company) {
      res.json(company);
    });
});

app.post("/api/contacts", function(req, res){
    db.Contact.create({
        companyName: req.body.newCompanyName,
        contactName: req.body.newContactName,
        contactEmail: req.body.newContactEmail,
        contactOfficePhone: req.body.newContactOfficePhone,
        contactMobilePhone: req.body.newContactMobilePhone,
        contactAlternateMobilePhone: req.body.newContactMobilePhoneAlternate,
        contactIsMain: req.body.mainContact
    }).then(function(contact) {
      res.json(contact);
    });
});

app.post("/api/locations", function(req, res){
    db.Location.create({
        companyName: req.body.newCompanyName,
        contactStreetAddress: req.body.newContactStreetAddress,
        contactCity: req.body.newContactCity,
        contactState: req.body.newContactState,
        contactZIP: req.body.newContactZIP,
        contactCountry: req.body.newContactCountry,
        contactIsMainLocation: req.body.mainLocation
    }).then(function(location) {
      res.json(location);
    });
});

app.post("/api/requestedServices", function(req, res){
    db.ServiceRequests.create({
        companyName: req.body.companyName,
        service: req.body.service,
        billable: req.body.billable,
        qty: req.body.qty,
        alternateName: req.body.alternateName,
        cost: req.body.cost,
        serviceDescription: req.body.serviceDescription
    }).then(function(service) {
      res.json(service);
    });
});


app.delete("/api/requestedServices", function(req, res){
    db.ServiceRequests.destroy({
        where: {},
        truncate: true
    })
    .then(function(result){
        res.json(result);
    });
});

app.delete("/api/requestedServices/:id", function(req, res){
    db.ServiceRequests.destroy({
        where: {
            id: req.params.id
        },
        truncate: true
    }).on('success', function() { console.log("Deleted sucessfully") })
    .then(function(result){
        res.json(result);
    });
});


app.get("/api/requestedServices", function(req, res){
    db.ServiceRequests.findAll({
        
    }).then(function(service) {
      res.json(service);
    });
});

app.get("/api/companies/:companyName", function(req, res){
    db.Company.findAll({
        where: {
            companyName: req.params.companyName,
        }
    }).then(function(company) {
      res.json(company);
    });
});

app.get("/api/locations/:companyName", function(req, res){
    db.Location.findAll({
        where: {
            companyName: req.params.companyName,
        }
    }).then(function(location) {
      res.json(location);
    });
});

app.get("/api/contacts/:companyName", function(req, res){
    db.Contact.findAll({
        where: {
            companyName: req.params.companyName,
        }
    }).then(function(contact) {
      res.json(contact);
    });
});

app.get("/api/listOfServices", function(req, res){
    db.ListOfServices.findAll({})
    .then(function(service){
        res.json(service);
    });
});

//TaskList

app.post("/api/taskList", function(req, res){
    db.TaskList.create({
        quotationIssuedBy: req.body.quotationIssuedBy,
        quotationNumber: req.body.quotationNumber,
        service: req.body.service,
        client: req.body.client,
        details: req.body.instructions,
        dateAssigned: req.body.startDate, //sort
        dueDate: req.body.validThru,
        serviceUnits: req.body.qty,
        dateCompleted: req.body.dateCompleted,
        status_notes_comments: req.body.comments,
        serviceDescription: req.body.serviceDescription,
        quoteApproved: req.body.quoteApproved,
        completed: req.body.completed
    }).then(function(task) {
      res.json(task);
    });
});

app.get("/api/taskList", function(req, res){
    db.TaskList.findAll({})
    .then(function(service){
        res.json(service);
    });
});

app.get("/", function(req, res){
    res.send("Hi");
})

}


