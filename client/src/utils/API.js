import axios from "axios";

export default{

    numAPI : function(number){
        return axios.get("http://apilayer.net/api/validate?access_key=4bc1e72596e3c0a64ec10002844133f5&number=" + number)
    },

    emailAPI : function(email){
        return axios.get("http://apilayer.net/api/check?access_key=4bc1e72596e3c0a64ec10002844133f5&email=" + email)
    }
}


