import axios from "axios";

export default{

    postService : function(item) {
        return axios.post("/api/services", item)
    },

    getEmployees : function(){
        return axios.get("/api/employees")
    },

    newCompanyLocation : function(item){
        return axios.post("/api/locations", item)
    },

    newCompanyContact : function(item){
        return axios.post("/api/contacts", item)
    },

    newCompany : function(item){
        return axios.post("/api/companies", item)
    },
    getLocation : function(){
        return axios.get("/api/locations")
    },

    getContact : function(){
        return axios.get("/api/contacts")
    },

    getCompany : function(){
        return axios.get("/api/companies")
    },
    getCompanyDetails: function(companyName){
        return axios.get("/api/companies/" + companyName)
    },
    getCompanyContacts: function(companyName){
        return axios.get("/api/contacts/" + companyName)
    },
    getCompanyLocations: function(companyName){
        return axios.get("/api/locations/" + companyName)
    },
    getCompanyEquipments: function(companyName){
        return axios.get("/api/companiesEquipments/" + companyName)
    },
    postCompanyEquipments: function(item){
        return axios.post("/api/companiesEquipments/", item)
    },
    getTopicBasedEquipments: function(){
        return axios.get("/api/topics")
    },
    newServiceRequest: function(item){
        return axios.post("/api/requestedServices", item)
    },
    getServiceRequests: function(){
        return axios.get("/api/requestedServices")
    },
    deleteServiceRequests: function(){
        return axios.delete("/api/requestedServices/")
    },
    deleteService: function(serviceName){
        return axios.delete("/api/requestedServices/" + serviceName)
    },
    getListOfServices: function(){
        return axios.get("/api/listOfServices")
    },
    addTask: function(item){
        return axios.post("/api/taskList", item)
    },
    getEmployeeTasks: function(employee){
        return axios.get("/api/tasklist/" + employee)
    },
    removeService: function(id){
        return axios.delete("/api/requestedServices/" + id)
    },
    modifyTask: function(id, item){
        return axios.put("/api/tasklist/" + id, item)
    },
    completedTasks: function(employee){
        return axios.get("/api/tasklist/" + employee + "/completed")
    },
    allTasks: function(){
        return axios.get("/api/tasklist")
    },
    filterTasks: function(quotationIssuedBy,quoteApproved,completed){
        const searchParams = new URLSearchParams();
        if(quotationIssuedBy !== undefined){
            searchParams.append("quotationIssuedBy", quotationIssuedBy);
        }
        if(quoteApproved !== undefined){
            searchParams.append("quoteApproved", quoteApproved);
        }
        if(completed !== undefined){
            searchParams.append("completed", completed);
        }
        console.log(searchParams.toString());
        return axios.get(`/api/tasklist/sortBy?` + searchParams.toString())
    },
    deleteTask: function(id){
        return axios.delete(`/api/tasklist/` + id)
    },
    modifyEntireTask: function(id, item){
        return axios.put("/api/tasklist/" + id, item)
    },
    incompleteTasks: function(emp) {
        return axios.get("/api/tasklist/" + emp + "/incomplete")
    },
    incompleteNullTasks: function(emp) {
        return axios.get("/api/tasklist/" + emp + "/incompleteNull")
    }
}

//https://cors-anywhere.herokuapp.com/
