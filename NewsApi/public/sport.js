const API_KEY = '1a79fae471a74d86b890c4fac6a3db47';

const NEWS_SOURCE = 'country=ie';

const category = 'category=sports';

const headers = new Headers();

const init = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
};

const url = `https://newsapi.org/v2/top-headlines?${NEWS_SOURCE}&${category}&apiKey=${API_KEY}`;

async function getDataAsync() {
    try {
        const response = await fetch(url);

        const json = await response.json();

        console.log(json.articles);

        displayData(json);

    } catch (err) {
        console.log(err);
    }
}

getDataAsync();

console.log('Has getDataAsync() finished yet?');

function displayData(data) {
    const articles = data.articles;

    document.getElementById('source').innerHTML = articles[0].source.name;

    const output = articles.map(article => {
        return `<article>
    <h4>${article.title}</h4>
    <p>${article.author}</p>
    <p>${Date(article.publishedAt)}</p>
    <img src=${article.urlToImage} alt='article image'>
    <p>${article.description}</p>
    <p><a href='${article.url}' target='_blank'>Read More</a></p>
</article>`;
    });

    document.getElementById('articles').innerHTML = output.join('');
}