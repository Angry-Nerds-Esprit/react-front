import http from "../http-common";
import { authHeader } from '../_helpers';


function startScrapping(nbp,idf,nidUser,skills,region) {
    query2= "site:linkedin.com/in/ AND" +"\"" + skills.join("\" \"") + "\"" +" AND \"" +region +"\""
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/scrape/?query=${query2}&nbp=${nbp}&idf=${idf}&nidUser=${nidUser}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export default {
    startScrapping,
    
  };

