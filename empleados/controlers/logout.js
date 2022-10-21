var db = firebase.firestore();
var auth = firebase.auth();

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {
      // console.log("sing out");
      window.sessionStorage.removeItem("uid", uid);
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
});
