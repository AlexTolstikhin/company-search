import axios from 'axios';


function callWiki (query_string) {
    const { WIKIPEDIA = {} } = window;
    return new Promise((resolve, reject) => {
        return WIKIPEDIA.getData(`http://en.wikipedia.org/wiki/${query_string}`, resp => resolve(resp))
    });
}

function callDuckDuckGo (query_string) {
    const url = `http://api.duckduckgo.com?q=${query_string}&format=json`
    return axios.get(url).then((response) => response)
}


export function fetch(query_string) {
    return Promise.all([callWiki(query_string), callDuckDuckGo(query_string)]).then((values) => {
        return values;
    })
}