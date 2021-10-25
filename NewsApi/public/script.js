//JavaScript Fetch, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

//Get a free API key from https://newsapi.org/
const API_KEY = '1a79fae471a74d86b890c4fac6a3db47';

// Use The Irish Times as the news source , for more see https://newsapi.org/sources
const NEWS_SOURCE = 'the-irish-times';

//The set HTTP headers. These will be used by Fetch when making requests to the news service
const headers = new Headers();
//Requests will use the GET method and permit cross origin requests
const init = {
              method: 'GET', 
              headers: headers,
              mode: 'cors',
              cache: 'default'
            };

//Build the URL using NEWS_SORCE and API_KEY
//Note: v2 of newsapi
const url = `https://newsapi.org/v2/top-headlines?sources=${NEWS_SOURCE}&apiKey=${API_KEY}`;



//Asynchronous Function getDataAsync()
async function getDataAsync() {
    //try catch
    try {
        //call fetch and await the response
        //initially returns a promise
        const response = await fetch(url);

        //As Response is dependant on fetch
        const json = await response.json();

        //output result to console (for testing purposes)
        console.log(json.articles);

        //call function( passing he json result) to display data in HTML page
        // **uncomment later **
        displayData(json);

        //catch and log and errors
    } 
    catch (err) {
        console.log(err);
    }
}

// Call the function 
getDataAsync();

console.log('Has getDataAsync() finished yet?');

//Parse JSON
//Create article elements
//Display in Web page
function displayData(data) {
    //retrieve articles array from json data
    const articles = data.articles;

    //set the source element
    document.getElementById('source').innerHTML = articles[0].source.name;

    //Use the Array method to Iterate through the array of articles (in json format)
    //Each article will be formatted as HTML and added to the output array
    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    //Finally the output array is inserted as the content into the article element.
    const output = articles.map(article => {
        //returns a template string for each article, values are inserted using ${ }
        //<articles> is an HTML5 semetic element
        return `<article>
                  <h4>${article.title}</h4>
                  <p>${article.author}</p>
                  <p>${article.publishedAt}</p>
                  <img src=${article.urlToImage} alt = 'article image'>
                  <p>${article.description}</p>
                  <p><a href= '${article.url}' target='_blank'>Read More</a></p>
                  </article>`;




    })

    //output the result of the previous step, is an array formatted articles
    //Set the innerHTML of the articles root element = output
    //why use join('')??? To join all the news 
    document.getElementById('articles').innerHTML = output.join('')
    //end function
}