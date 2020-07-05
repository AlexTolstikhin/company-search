import axios from 'axios';

/**
 * Get API to fetch summary from Wikipedia
 * @param {String} query_string
 */
function getWikiSummary (query_string) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query_string}`;
    return axios.get(url).then(({ data }) => data)
}

/**
 * Get API to fetch logo from Wikipedia
 * @param {String} query_string
 */
function getWikiLogo (query_string) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/media-list/${query_string}`;
    return axios.get(url).then(({ data: { items } }) => items && items[0] && items[0].srcset[0].src)
}

/**
 * Get API to fetch related topics links from DuckDuckGo
 * @param {query_string} string
 */
function callDuckDuckGo (query_string) {
    const url = `http://api.duckduckgo.com?q=${query_string}&format=json`
    return axios.get(url).then(({ data: { RelatedTopics = [] } }) => RelatedTopics.filter(i => i.FirstURL))
}

/**
 * Main fetch with Promise.all that calls APIs in parallel
 * @param {String} query_string
 */
export function fetch(query_string) {
    return Promise.all([getWikiSummary(query_string), callDuckDuckGo(query_string), getWikiLogo(query_string)])
        .then((values) => {
            return values;
        })
        .catch((err) => {
            return err;
        })
}