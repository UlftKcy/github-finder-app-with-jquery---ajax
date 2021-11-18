$(document).ready(function () {
  $("#searchUser").on("keyup", function (e) {
    let username = e.target.value;
    // make request to Github
    $.ajax({
      url: "https://api.github.com/users/" + username,
      data: {
        CLIENT_ID: "11357e9044833ca31e50",
        CLIENT_SECRET: "841622237838faffd74a073155e76e017b392e88",
      },
    }).done(function (user) {
      $.ajax({
        url: "https://api.github.com/users/" + username + "/repos",
        data: {
          CLIENT_ID: "11357e9044833ca31e50",
          CLIENT_SECRET: "841622237838faffd74a073155e76e017b392e88",
          sort: "created_asc",
          per_page: 5,
        },
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $("#repos").append(`
              <div class="card mb-3 bg-light p-2">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-2">
                        <strong>${repo.name}</strong>: ${repo.description}
                    </div>
                    <div class="col-lg-4 mb-2">
                        <span class="badge bg-primary">Forks: ${repo.forks_count}</span>
                        <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge bg-success">Stargazers: ${repo.stargazers_count}</span>
                    </div>
                    <div class="col-lg-2 mb-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                    </div>
                </div>
              </div>
              `);
        });
      });
      $("#profile").html(`
      <div class="card mb-3 p-3">
      <div class="row">
        <div class="col-md-3 px-0">
          <img src=${user.avatar_url} class="img-fluid" alt="${user.name}">
          <a href="${user.html_url}" target="_blank" class="btn btn-danger w-100 mt-2">View Profile</a>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">
            <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge bg-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge bg-success">Followers: ${user.followers}</span>
            <span class="badge bg-danger">Following: ${user.following}</span>
            </p>
            <p class="card-text">
            <ul class="list-group">
                <li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
                <li class="list-group-item"><strong>Website/Blog:</strong> ${user.blog}</li>
                <li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
                <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
            </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
    <h3 class="page-header">Latest Repos</h3>
    <div id="repos"></div>
            `);
    });
  });
});
