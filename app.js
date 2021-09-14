//using the fetch api
function wikiSearch(query) {
  const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=10`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      const list = document.getElementById("response");
      //check the last iteration and do something
      let iterations = jsonData.pages.length;
      list.innerHTML = "";
      let output = "<h2>Searched Results</h2>";
      output += "<ul>";
      for (let key in jsonData.pages) {
        //check if thumbnail is null
        if (jsonData.pages[key].thumbnail == null) {
          output += `
            <li class="items-list">
            <img src ="" width="200" height="auto"> 
            <div class="textright">
            <div class="title">
            <h2> ${jsonData.pages[key].title} </h2> 
            </div>
            <div class="titletext">
            <p> ${jsonData.pages[key].description} </p>
            </div>
            </div>
            </li>
            `;
        } else {
          output += `
            <li class="items-list">
            <img src ="${jsonData.pages[key].thumbnail.url}" width="200" height="auto"> 
            <div class="textright">
            <div class="card-body">
             <h5 class="card-title">${jsonData.pages[key].title}</h5>
             <p class="card-text">${jsonData.pages[key].description}</p>
            </div>
            </div>
            </li>
            `;
        }
      }
      output += "</ul>";
      document.getElementById("response").innerHTML = output;
    })
    .catch((error) => {
      document.getElementById("errorMessage").innerHTML = error;
    });
}

window.onload = () => {
  const searchData = document.getElementById("searchInput");
  searchData.onkeyup = (event) => {
    setTimeout(() => {
      wikiSearch(searchData.value);
    }, 250);
  };
};
