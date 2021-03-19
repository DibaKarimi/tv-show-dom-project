//You can edit ALL of the code here
let episodeLength;
function setup() {
  createSelectEpisode();
  createSearchSection();
  const allEpisodes = getAllEpisodes();
  episodeLength = allEpisodes.length;
  makePageForEpisodes(allEpisodes);
  searchElement = document.getElementById("searchKey");
  searchElement.addEventListener("input", search);
  let SelectElement = document.getElementById("selectEpisode");
}
function createEpisodeCode(number, season) {
  number = number < 10 ? `0${number}` : number;
  season = season < 10 ? `0${season}` : season;
  return `S${number}E${season}`;
}
function createSelectEpisode() {
  let searchSection = document.createElement("section");
  searchSection.id = "searchBox";
  searchSection.className = "row p-4 ";
  let SelectElement = document.createElement("select");
  SelectElement.className = "col-4 m-3 p-2 form-control";
  SelectElement.id = "selectEpisode";
  let allEpisodes = getAllEpisodes();
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
  const rootElem = document.getElementById("root");
  rootElem.append(searchSection);
  searchSection.appendChild(SelectElement);
  SelectElement.addEventListener("change", function () {
    showEpisode(this.value);
  });
}
function showEpisode(episodeId) {
  const allEpisodes = getAllEpisodes();
  let episodeFilter =
    episodeId === "0"
      ? allEpisodes
      : allEpisodes.filter((element) => element.id === parseInt(episodeId));
  let rootElem = document.getElementById("root");
  let container = document.getElementById("container");
  rootElem.removeChild(container);
  makePageForEpisodes(episodeFilter);
}
function createSearchSection() {
  let searchBox = document.getElementById("searchBox");
  let inputElement = document.createElement("input");
  inputElement.id = "searchKey";
  inputElement.className = "col-3 m-3  form-control";
  let labelElement = document.createElement("label");
  labelElement.id = "searchComment";
  labelElement.className = "col-3 m-3 text-center";
  searchBox.append(inputElement, labelElement);
}
function makePageForEpisodes(episodeList) {
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
    imageEpisode.src = episodeElement.image.medium;
    imageEpisode.alt = episodeElement.name;
    description.innerHTML = episodeElement.summary;
  });
}
function filterByKey(episode) {
  let searchKey = document.getElementById("searchKey").value;
  return (
    episode.name.toLowerCase().includes(searchKey.toLowerCase()) ||
    episode.summary.toLowerCase().includes(searchKey.toLowerCase())
  );
}
function search() {
  const allEpisodes = getAllEpisodes();
  let episodeFilter = allEpisodes.filter(filterByKey);
  const rootElem = document.getElementById("root");
  let container = document.getElementById("container");
  rootElem.removeChild(container);
  makePageForEpisodes(episodeFilter);
}
window.onload = setup;
