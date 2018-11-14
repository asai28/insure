import axios from "axios";

export default{

    postService : function(item) {
        return axios.post("/api/services", item)
    },

    getEmployees : function(){
        return axios.get("/api/employees")
    }
}

//https://cors-anywhere.herokuapp.com/