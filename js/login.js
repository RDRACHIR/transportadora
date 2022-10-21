var db = firebase.firestore();
var auth = firebase.auth();

var login = document.querySelector("#login");

login.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var clave = document.getElementById("clave").value;

  auth
    .signInWithEmailAndPassword(email, clave)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //Graba en el session stoage del navegado
      sessionStorage.setItem("uid", user.uid);

      // validacion de datos
      var docRef = db.collection("usuario").doc(user.uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().rol == "admin") {
              // console.log(doc.data().rol);
              window.location.href = "../administrador/dashboard.html";
            } else if (doc.data().rol == "Empleado") {
              window.location.href = "../empleados/index.html";
            }
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
    .catch((error) => {
      // var errorCode = error.code;
      // var errorMessage = error.message;
      alert("No tienes los permisos para ingresar ");

      // email = document.getElementById("email").value = "";
      // clave = document.getElementById("clave").value = "";
    });
});
