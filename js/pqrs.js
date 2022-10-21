var db = firebase.firestore();

// Validacion de datos
function validar() {
  var nombre = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var asunto = document.getElementById("tipoa").value;
  var mensaje = document.getElementById("msg").value;

  var controln = 0;
  var controle = 0;
  var controla = 0;
  var controlm = 0;

  // Validaciones
  if (nombre != "") {
    controln = 1;
    document.getElementById("errorn").style.display = "none";
    document.getElementById("name").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorn").style.display = "block";
    document.getElementById("name").style.border = "2px solid #C00";
  }

  if (email != "") {
    controle = 1;
    document.getElementById("errore").style.display = "none";
    document.getElementById("email").style.border = "2px solid #616161";
  } else {
    document.getElementById("errore").style.display = "block";
    document.getElementById("email").style.border = "2px solid #C00";
  }

  if (asunto != "") {
    controla = 1;
    document.getElementById("errora").style.display = "none";
    document.getElementById("tipoa").style.border = "2px solid #616161";
  } else {
    document.getElementById("errora").style.display = "block";
    document.getElementById("tipoa").style.border = "2px solid #C00";
  }

  if (mensaje != "") {
    controlm = 1;
    document.getElementById("errorm").style.display = "none";
    document.getElementById("msg").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorm").style.display = "block";
    document.getElementById("msg").style.border = "2px solid #C00";
  }

  // Llamado funcion agreagar
  if ((controln, controle, controla, controlm == 1)) {
    agregar();
  }
}

//---------agregar servicio
function agregar() {
  var nombre = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var asunto = document.getElementById("tipoa").value;
  var mensaje = document.getElementById("msg").value;

  db.collection("pqrs")
    .add({
      nombre: nombre,
      email: email,
      asunto: asunto,
      mensaje: mensaje,
    })
    .then((docRef) => {
      alert("La PQRs se envio correctamente");
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      alert("Error");
      console.error("Error adding document: ", error);
    });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("tipoa").value = "";
  document.getElementById("msg").value = "";
}
//---------leer servicios
function leerservicio() {
  //---------consulta a la colección
  db.collection("pqrs").onSnapshot((querySnapshot) => {
    document.getElementById("conpqrs").innerHTML = "";
    querySnapshot.forEach((doc) => {
      //---------muestra la consulta
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`cliente => ${doc.data().cliente}`);
      document.getElementById("conpqrs").innerHTML += `
							<tr>
              <td>${doc.data().nombre}</td>
								<td>${doc.data().email}</td>
								<td>${doc.data().asunto}</td>
								<td>${doc.data().mensaje}</td>
								<td>
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

//eliminar servicios
function pregunta_el(pid) {
  //console.log(pid);
  if (confirm("¿Esta seguro de eliminar el registro?")) {
    eliminar(pid);
  } else {
    console.log("No se elimino");
  }
}
function eliminar(pid) {
  db.collection("pqrs")
    .doc(pid)
    .delete()
    .then(() => {
      alert("La PQRs se ha elimiando con exito");
      //console.log("Document successfully deleted!");
    })
    .catch((error) => {
      alert("Error");
      console.error("Error removing document: ", error);
    });
}
