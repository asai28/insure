import axios from "axios";

export default{

    postService : function(item) {
        return axios.post("/api/services", item)
    }
}

//https://cors-anywhere.herokuapp.com/