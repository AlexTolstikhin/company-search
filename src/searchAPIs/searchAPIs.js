import axios from 'axios';

function callWiki (query_string) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query_string.replace(' ', '_')}`;
    return axios.get(url).then(({ data }) => data)
}

function callDuckDuckGo (query_string) {
    const url = `http://api.duckduckgo.com?q=${query_string}&format=json`
    return axios.get(url).then(({ data: { RelatedTopics = [] } }) => RelatedTopics.filter(i => i.FirstURL))
}


export function fetch(query_string) {
    return Promise.all([callWiki(query_string), callDuckDuckGo(query_string)])
        .then((values) => {
            return values;
        })
        .catch((err) => {
            debugger;
            return err
        })
}