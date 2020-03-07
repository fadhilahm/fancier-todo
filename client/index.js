function showLanding() {
  $("#landing-page").show();
  $("#dashboard-page").hide();
  $("#landing-login").hide();
  $("#landing-register").show();
}

function showDashboard() {
  $("#landing-page").hide();
  $("#dashboard-page").show();
}

function signOut() {
  localStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
  showLanding();
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: "http://localhost:3000/gsignin",
    method: "POST",
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.setItem("token", data.token);
      showDashboard();
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => {
      console.log("sending data...");
    });
}

$(document).ready(() => {
  let token = localStorage.getItem("token");
  if (token) {
    showDashboard();
  } else {
    showLanding();
  }
  $("#register-submit").on("click", e => {
    e.preventDefault();
    let email = $("#register-email").val();
    let password = $("#register-password").val();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/register",
      data: {
        email,
        password
      }
    })
      .done(response => {
        console.log(response);
        $("#landing-register").hide();
        $("#landing-login").show();
      })
      .fail(err => {
        console.log(err);
      })
      .always(() => {
        console.log("sending data...");
      });
  });

  $("#login-submit").on("click", e => {
    e.preventDefault();
    let email = $("#login-email").val();
    let password = $("#login-password").val();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/login",
      data: {
        email,
        password
      }
    })
      .done(response => {
        localStorage.setItem("token", response.token);
        showDashboard();
      })
      .fail(err => {
        console.log(err);
      })
      .always(() => console.log("sending data..."));
  });

  $("#switch-login").on("click", () => {
    $("#landing-login").show();
    $("#landing-register").hide();
  });
  $("#switch-register").on("click", () => {
    $("#landing-register").show();
    $("#landing-login").hide();
  });
});
