import axios from "axios";

export default{

    numAPI : function(number){
        return axios.get("http://apilayer.net/api/validate?access_key=4bc1e72596e3c0a64ec10002844133f5&number=" + number)
    },

    emailAPI : function(email){
        // return axios.get("http://apilayer.net/api/check?access_key=aa06daf29898cea7aee1acdd9a0b6fac&smtp=1&format=1&email=" + email)
        //return axios.get("http://api.fullcontact.com/v2/verification/email?apiKey=2iSOaMrWNcIbufyyttheQnxYlsWZb6cZ&email="+email)
        return axios.get(`https://api.trumail.io/v2/lookups/json?email=${email}`)
    },

    companyAPI : function(company){
        return axios.get("https://api.fullcontact.com/v2/company/search.json?apiKey=2iSOaMrWNcIbufyyttheQnxYlsWZb6cZ&companyName=" + company)
    }
}

//https://cors-anywhere.herokuapp.com/