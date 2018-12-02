const apiKey = 'f74ba2ea290a40a8bd018f4171f04198';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'le-monde';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
      navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
  }

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });
});

async function updateSources() {
    const res = await fetch( `https://newsapi.org/v2/sources?apiKey=f74ba2ea290a40a8bd018f4171f04198`);
    const json = await res.json();
    
    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
    .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${source}&from=2018-12-01&to=2018-12-01&sortBy=popularity&apiKey=${apiKey}`);
    const json = await res.json();
    
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
        </a>
    </div>
    `;
}