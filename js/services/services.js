async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: data,
    });
    return await res.json();
};

async function getResource(url) {
    const res = await fetch(url);

    if(!res.ok) throw new Error(`Не могу сфетчить URL: ${url}, статус сервера: ${res.status}`);

    return await res.json();
}

export {postData, getResource};