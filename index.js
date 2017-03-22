function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
  Handlebars.registerPartial("repoCommits", $("#commits-template").html())
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, (data) => {
    const template = Handlebars.compile($('#results-template').html())
    $('#results').html(template(data))
  }).fail((error) => {
    displayError()
  })
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el) {
  const user = el.dataset.owner
  const name = el.dataset.repository
  $.get(`https://api.github.com/repos/${user}/${name}/commits`, (data) => {
    const template = Handlebars.compile($('#commits-template').html())
    $('#details').html(template(data))
  }).fail((error) => {
    displayError()
  })
}

$(document).ready(function (){
  handlebarsSetup()
});
