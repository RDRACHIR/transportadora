var db = firebase.firestore();
// Captura del  id del session storage
var uid = sessionStorage.getItem("uid");

if (uid == "") {
  window.location.href = "../../index.html";
} else if (uid == null) {
  window.location.href = "../../index.html";
} else {
  //console.log(uid);
  var docRef = db.collection("usuario").doc(uid);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        // console.log(doc.data().rol);
        sessionStorage.setItem("usuario", JSON.stringify(doc.data()));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        // window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

var usuario = sessionStorage.getItem("usuario");

//console.log(usuario);

var user = JSON.parse(usuario);

// console.log(user.rol);