


async function callWiki (query_string) {
    const { WIKIPEDIA = {} } = window;
    return new Promise((resolve, reject) => {
        return WIKIPEDIA.getData(`http://en.wikipedia.org/wiki/${query_string}`, resp => resolve(resp))
    });
}

export function fetch(query_string) {
    return Promise.all([callWiki(query_string)]).then((values) => {
        return values;
    })
}