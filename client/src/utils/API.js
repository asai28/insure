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
    getServiceRequests: function(item){
        return axios.get("/api/requestedServices")
    },
    deleteServiceRequests: function(companyName){
        return axios.delete("/api/requestedServices/"+companyName)
    },
    deleteService: function(serviceName){
        return axios.delete("/api/requestedServices/" + serviceName)
    },
    getListOfServices: function(){
        return axios.get("/api/listOfServices")
    }

}

//https://cors-anywhere.herokuapp.com/
