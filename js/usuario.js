var db = firebase.firestore();

//-------monstrar formulario
function mostrar(dato) {
  switch (dato) {
    case "ver":
      document.getElementById("form").style.display = "block";
      document.getElementById("visualizar").style.display = "none";
      break;
    case "ocultar":
      document.getElementById("form").style.display = "none";
      document.getElementById("visualizar").style.display = "block";
      document.getElementById("botong").style.display = "block";
      document.getElementById("botone").style.display = "none";
      break;
  }
}

// Validacion de datos
function validar() {
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var clave = document.getElementById("clave").value;
  var telefono = document.getElementById("telefono").value;
  var rol = document.getElementById("rol").value;

  var controln = 0;
  var controle = 0;
  var controlc = 0;
  var controlt = 0;
  var controlr = 0;

  // Validaciones
  if (nombre != "") {
    controln = 1;
    document.getElementById("errorn").style.display = "none";
    document.getElementById("nombre").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorn").style.display = "block";
    document.getElementById("nombre").style.border = "2px solid #C00";
  }

  if (email != "") {
    controle = 1;
    document.getElementById("errore").style.display = "none";
    document.getElementById("email").style.border = "2px solid #616161";
  } else {
    document.getElementById("errore").style.display = "block";
    document.getElementById("email").style.border = "2px solid #C00";
  }

  if (clave != "") {
    controlc = 1;
    document.getElementById("errorc").style.display = "none";
    document.getElementById("clave").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorc").style.display = "block";
    document.getElementById("clave").style.border = "2px solid #C00";
  }

  if (telefono != "") {
    controlt = 1;
    document.getElementById("errort").style.display = "none";
    document.getElementById("telefono").style.border = "2px solid #616161";
  } else {
    document.getElementById("errort").style.display = "block";
    document.getElementById("telefono").style.border = "2px solid #C00";
  }

  if (rol != "") {
    controlt = 1;
    document.getElementById("errorr").style.display = "none";
    document.getElementById("rol").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorr").style.display = "block";
    document.getElementById("rol").style.border = "2px solid #C00";
  }

  // Llamado funcion agreagar
  if ((controln, controle, controlc, controlt, controlt == 1)) {
    agregar();
  }
}

//------------agregar un nuevo usuario
function agregar() {
  var nombreu = document.getElementById("nombre").value;
  var emailu = document.getElementById("email").value;
  var claveu = document.getElementById("clave").value;
  var telefonou = document.getElementById("telefono").value;
  var rolu = document.getElementById("rol").value;
  var uid = "";

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailu, claveu)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      uid = user.uid;
      //----------crear usuario BD
      db.collection("usuario")
        .doc(uid)
        .set({
          id: uid,
          nombre: nombreu,
          email: emailu,
          clave: claveu,
          telefono: telefonou,
          rol: rolu,
        })
        .then(() => {
          alert("El usuario se guardo correctamente");
          console.log("Document successfully written!");
        })
        .catch((error) => {
          alert("Error guardar base de datos");
          console.error("Error writing document: ", error);
        });

      document.getElementById("form").style.display = "none";
      document.getElementById("visualizar").style.display = "block";

      document.getElementById("nombre").value = "";
      document.getElementById("email").value = "";
      document.getElementById("clave").value = "";
      document.getElementById("telefono").value = "";
      document.getElementById("rol").value = "";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      alert(`Error creación usuario --> "${errorMessage}"`);
      // ..
    });
}

//---------leer usuarios
function leerservicio() {
  //---------consulta a la colección
  db.collection("usuario").onSnapshot((querySnapshot) => {
    document.getElementById("conusuario").innerHTML = "";
    querySnapshot.forEach((doc) => {
      //---------muestra la consulta
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`cliente => ${doc.data().cliente}`);
      document.getElementById("conusuario").innerHTML += `
							<tr>
								<td>${doc.data().nombre}</td>
								<td>${doc.data().email}</td>
								<td>${doc.data().clave}</td>
								<td>${doc.data().telefono}</td>
								<td>${doc.data().rol}</td>
								<td>
									<span class="fas fa-pen-square  iconed" id="iconed" title="Editar" onclick="editar_form('${
                    doc.id
                  }', '${doc.data().nombre}', '${doc.data().email}', '${
        doc.data().clave
      }', '${doc.data().telefono}', '${doc.data().rol}')"></span>
									<span class="fas fa-trash  iconbo" id="iconbo" title="Elminar" onclick="pregunta_el('${
                    doc.id
                  }')"></span>								
								</td>
							</tr>
						
						`;
    });
  });
}

leerservicio();

//eliminar usuario
function pregunta_el(uid) {
  //console.log(pid);
  if (confirm("¿Esta seguro de eliminar el registro?")) {
    eliminar(uid);
  } else {
    console.log("No se elimino");
  }
}

function eliminar(uid) {
  db.collection("usuario")
    .doc(uid)
    .delete()
    .then(() => {
      alert("El usuario se ha elimiando con exito");
      //console.log("Document successfully deleted!");
    })
    .catch((error) => {
      alert("Error");
      console.error("Error removing document: ", error);
    });
}

//---------editar registro
function editar_form(uid, nombre, email, clave, telefono, rol) {
  document.getElementById("uid").value = uid;
  document.getElementById("nombre").value = nombre;
  document.getElementById("email").value = email;
  document.getElementById("clave").value = clave;
  document.getElementById("telefono").value = telefono;
  document.getElementById("rol").value = rol;
  mostrar("ver");

  document.getElementById("botong").style.display = "none";
  document.getElementById("botone").style.display = "block";
}

function editar() {
  var uid = document.getElementById("uid").value;
  var nombreu = document.getElementById("nombre").value;
  var emailu = document.getElementById("email").value;
  var claveu = document.getElementById("clave").value;
  var telefonou = document.getElementById("telefono").value;
  var rolu = document.getElementById("rol").value;

  var usuarioRef = db.collection("usuario").doc(uid);

  // Set the "capital" field of the city 'DC'
  return usuarioRef
    .update({
      nombre: nombreu,
      email: emailu,
      clave: claveu,
      telefono: telefonou,
      rol: rolu,
    })
    .then(function () {
      console.log("Document successfully updated!");
      document.getElementById("visualizar").style.display = "block";

      document.getElementById("nombre").value = "";
      document.getElementById("email").value = "";
      document.getElementById("clave").value = "";
      document.getElementById("telefono").value = "";
      document.getElementById("rol").value = "";
      mostrar("ocultar");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      alert("¡Error!");
      console.error("Error updating document: ", error);
    });
}
