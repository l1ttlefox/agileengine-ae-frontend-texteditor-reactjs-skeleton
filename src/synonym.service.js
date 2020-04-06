export async function getSynonyms (word) {
    const synonymUrl = 'https://api.datamuse.com/words';
    const params = new URLSearchParams({
        ml: word,
        max: '5'
    });
    const synonymSearchString = `${synonymUrl}?${params.toString()}`
    const response  = await fetch(synonymSearchString, {
        method: 'GET'
    });

    return response.json();
}


