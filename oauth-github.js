// JavaScript for github-api.html (GitHub git API)

var repoHTML = "<input type='text' name='user' value='dpaz' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='oauth' " +
    "id='repo' size='10' />" +
    "<button id='repobutton' type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var github;
var myrepo;
var network = "github";



function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    myrepo = github.getRepo(user, reponame);
    myrepo.show(showRepo);
};

function showRepo(error, repo) {
    var repodata = $("#repodata");
    if (error) {
				repodata.html("<p>Error code: " + error.error + "</p>");
					} else {
				repodata.html("<p>Repo data:</p>" +
								"<ul><li>Full name: " + repo.full_name + "</li>" +
								"<li>Description: " + repo.description + "</li>" +
								"<li>Created at: " + repo.created_at + "</li>" +
								"</ul><button type='button' id='write'>" +
								"Write File!</button>" +
								"<button type='button' id='read'>" +
								"Read File!</button>" +
								"<div id='readfile' />");
				console.log (repo.full_name, repo.description, repo.created_at);
				$("#write").click(writeFile);
				$("#read").click(readFile);
    }
};



function writeFile() {
    myrepo.write('master', 'datafile',new Date().toLocaleString(),"Updating data");
};

function readFile() {
    myrepo.read('master', 'datafile', function(data) {console.log (data);$("#readfile").html("<p>Contents:</p><p>" + data + "</p>");});
};


$(document).ready(function() {
		

  	hello.init({
			github : "b8c7cc54b4907ae1f1eb"
				},{
			redirect_uri : 'redirect.html',
			oauth_proxy : "https://auth-server.herokuapp.com/proxy"
		});
		
		github = hello(network);
		github.login({response_type: 'code'}).then( function(){
			token = hello(network).getAuthResponse().access_token;
			github = new Github({
					token: token,
					auth: "oauth"
			});
			$("#repoform").html(repoHTML);
			$("#repobutton").click(getRepo);
		});
});
