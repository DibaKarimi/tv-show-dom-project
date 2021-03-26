
let url = `https://api.tvmaze.com/shows/1632/episodes`;
let selectedShow = 0;
let episodeLength;
let allEpisodes = [];

function setup(url, selectedShow) {
  makeSectionForSelects();
  fillSelectByShows(selectedShow);
  fetch(url)
    .then((Response) => Response.json())
    .then(function (data) {
      allEpisodes = data;
      episodeLength = allEpisodes.length;
      makeSearchSection();
      fillSelectByEpisodes(allEpisodes);
      makeSectionForEpisodes(allEpisodes);
    })
    .catch((error) => console.error(error));
}

function makeSectionForSelects() {
  const rootElem = document.getElementById("root");
  let searchSection = document.createElement("section");
  searchSection.id = "searchSection";
  searchSection.className = "row p-4 mx-auto";
  rootElem.append(searchSection);
  let showSelectElement = document.createElement("select");
  showSelectElement.id = "showSelect";
  showSelectElement.className = "col-10 mx-auto p-2";
  let episodeSelectElement = document.createElement("select");
  episodeSelectElement.className = "col-3 m-3 p-2 form-control";
  episodeSelectElement.id = "selectEpisode";
  searchSection.append(
    showSelectElement,
    episodeSelectElement
  );
}

function fillSelectByShows(selectedShow) {
  let searchSection = document.getElementById("searchSection");
  let SelectElement = document.getElementById("showSelect");
  let allShows = getAllShows();
  allShows.map((show) => {
    let optionText = show.name;
    let optionElement = document.createElement("option");
    optionElement.innerText = show.name;
    optionElement.value = show.id;
    SelectElement.appendChild(optionElement);
  });
  SelectElement.selectedIndex = selectedShow;
  SelectElement.addEventListener("change", function () {
    let url = `https://api.tvmaze.com/shows/${this.value}/episodes`;
    let rootElem = document.getElementById("root");
    rootElem.innerHTML = ``;
    setup(url, this.selectedIndex);
  });
}

function makeSearchSection() {
  let searchSection = document.getElementById("searchSection");
  let inputElement = document.createElement("input");
  inputElement.id = "searchKey";
  inputElement.className = "col-3 m-3  form-control";
  let labelElement = document.createElement("label");
  labelElement.id = "searchComment";
  labelElement.className = "col-4 m-3 text-center";
  searchSection.append(inputElement, labelElement);
  inputElement.addEventListener("input", search);
}

function search() {
  let episodeFilter = allEpisodes.filter(filterByKey);
  const rootElem = document.getElementById("root");
  let container = document.getElementById("container");
  rootElem.removeChild(container);
  makeSectionForEpisodes(episodeFilter);
}

function filterByKey(episode) {
  let searchKey = document.getElementById("searchKey").value;
  return (
    episode.name.toLowerCase().includes(searchKey.toLowerCase()) ||
    episode.summary.toLowerCase().includes(searchKey.toLowerCase())
  );
}






function fillSelectByEpisodes(allEpisodes) {
  let searchSection = document.getElementById("searchSection");
  let SelectElement = document.getElementById("selectEpisode");
  let episodeCode;
  let allOpt = document.createElement("option");
  allOpt.value = 0;
  allOpt.innerHTML = "All Episode";
  SelectElement.appendChild(allOpt);
  allEpisodes.map((episode) => {
    episodeCode = createEpisodeCode(episode.number, episode.season);
    let episodeTitle = `${episodeCode}-${episode.name}`;
    let opt = document.createElement("option");
    opt.value = episode.id;
    opt.innerHTML = episodeTitle;
    SelectElement.appendChild(opt);
  });
  SelectElement.addEventListener("change", function () {
    let searchElement = document.getElementById("searchKey");
    searchElement.value = "";
    showEpisode(allEpisodes, this.value);
  });
}

function createEpisodeCode(number, season) {
  number = number < 10 ? `0${number}` : number;
  season = season < 10 ? `0${season}` : season;
  return `S${number}E${season}`;
}

function showEpisode(allEpisodes, episodeId) {
  let episodeFilter =
    episodeId == "0"
      ? allEpisodes
      : allEpisodes.filter((element) => element.id == episodeId);
  let rootElem = document.getElementById("root");
  let container = document.getElementById("container");
  rootElem.removeChild(container);
  makeSectionForEpisodes(episodeFilter);
}



function makeSectionForEpisodes(episodeList) {
  let searchComment = document.getElementById("searchComment");
  searchComment.textContent = `Displaying ${episodeList.length}/${episodeLength} episodes`;
  const rootElem = document.getElementById("root");
  let container = document.createElement("section");
  container.className = "container";
  container.id = "container";
  rootElem.appendChild(container);
  let rowDiv = document.createElement("div");
  rowDiv.className = "row ";
  container.appendChild(rowDiv);
  episodeList.map((episodeElement) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.className =
      "col-md-4 col-sm-6  p-sm-2 p-md-3 mx-auto shadow-sm rounded";
    let titleEpisode = document.createElement("h5");
    titleEpisode.className = "pd-2 m-2 align-self-start";
    let imageEpisode = document.createElement("img");
    let description = document.createElement("div");
    description.className = "text-secondary m-2 ";
    let sectionElement = document.getElementById("displayImages");
    rowDiv.appendChild(episodeDiv);
    episodeDiv.append(titleEpisode, imageEpisode, description);
    titleEpisode.innerHTML = `${episodeElement.name}-${createEpisodeCode(
      episodeElement.number,
      episodeElement.season
    )}`;
    if (episodeElement.image != null) {
      imageEpisode.src = episodeElement.image.medium;
      imageEpisode.alt = episodeElement.name;
    }
    description.innerHTML = episodeElement.summary;
  });
}




window.onload = setup(url, selectedShow);
