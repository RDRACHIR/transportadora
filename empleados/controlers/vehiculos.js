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
  var modelo = document.getElementById("modelo").value;
  var año = document.getElementById("año").value;
  var placa = document.getElementById("placa").value;
  var estado = document.getElementById("estado").value;
  var obsevacion = document.getElementById("observacion").value;

  var controlm = 0;
  var controla = 0;
  var controlp = 0;
  var controle = 0;
  var controlo = 0;

  // Validaciones
  if (modelo != "") {
    controlm = 1;
    document.getElementById("errorm").style.display = "none";
    document.getElementById("modelo").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorm").style.display = "block";
    document.getElementById("modelo").style.border = "2px solid #C00";
  }

  if (año != "") {
    controla = 1;
    document.getElementById("errora").style.display = "none";
    document.getElementById("año").style.border = "2px solid #616161";
  } else {
    document.getElementById("errora").style.display = "block";
    document.getElementById("año").style.border = "2px solid #C00";
  }

  if (placa != "") {
    controlp = 1;
    document.getElementById("errorp").style.display = "none";
    document.getElementById("placa").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorp").style.display = "block";
    document.getElementById("placa").style.border = "2px solid #C00";
  }

  if (estado != "") {
    controle = 1;
    document.getElementById("errore").style.display = "none";
    document.getElementById("estado").style.border = "2px solid #616161";
  } else {
    document.getElementById("errore").style.display = "block";
    document.getElementById("estado").style.border = "2px solid #C00";
  }

  if (obsevacion != "") {
    controlo = 1;
    document.getElementById("erroro").style.display = "none";
    document.getElementById("observacion").style.border = "2px solid #616161";
  } else {
    document.getElementById("erroro").style.display = "block";
    document.getElementById("observacion").style.border = "2px solid #C00";
  }

  // Llamado funcion agreagar
  if ((controlm, controla, controlp, controle, controlo == 1)) {
    agregar();
  }
}

//------------agregar un nuevo usuario
function agregar() {
  var modelov = document.getElementById("modelo").value;
  var añov = document.getElementById("año").value;
  var placav = document.getElementById("placa").value;
  var estadov = document.getElementById("estado").value;
  var observacionv = document.getElementById("observacion").value;

  db.collection("vehiculo")
    .add({
      modelo: modelov,
      año: añov,
      placa: placav,
      estado: estadov,
      observacion: observacionv,
    })
    .then((docRef) => {
      alert("El vehiculo se guardo correctamente");
      // console.log("Document successfully written!");
    })
    .catch((error) => {
      alert("Error guardar base de datos");
      // console.error("Error writing document: ", error);
    });

  document.getElementById("form").style.display = "none";
  document.getElementById("visualizar").style.display = "block";

  document.getElementById("modelo").value = "";
  document.getElementById("año").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("observacion").value = "";
  // ...
}

//---------leer usuarios
function leervehiculo() {
  //---------consulta a la colección
  db.collection("vehiculo").onSnapshot((querySnapshot) => {
    document.getElementById("convehiculo").innerHTML = "";
    querySnapshot.forEach((doc) => {
      //---------muestra la consulta
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`cliente => ${doc.data().cliente}`);
      document.getElementById("convehiculo").innerHTML += `
							<tr>
								<td>${doc.data().modelo}</td>
								<td>${doc.data().año}</td>
								<td>${doc.data().placa}</td>
								<td>${doc.data().estado}</td>
								<td>${doc.data().observacion}</td>
								<td>
									<span class="fas fa-pen-square  iconed" id="iconed" title="Editar" onclick="editar_form('${
                    doc.id
                  }', '${doc.data().modelo}', '${doc.data().año}', '${
        doc.data().placa
      }', '${doc.data().estado}', '${doc.data().observacion}')"></span>
									<span class="fas fa-trash  iconbo" id="iconbo" title="Elminar" onclick="pregunta_el('${
                    doc.id
                  }')"></span>								
								</td>
							</tr>
						
						`;
    });
  });
}

leervehiculo();

//eliminar usuario
function pregunta_el(vid) {
  //console.log(pid);
  if (confirm("¿Esta seguro de eliminar el registro?")) {
    eliminar(vid);
  } else {
    console.log("No se elimino");
  }
}

function eliminar(vid) {
  db.collection("vehiculo")
    .doc(vid)
    .delete()
    .then(() => {
      alert("El vehiculo se ha elimiando con exito");
      //console.log("Document successfully deleted!");
    })
    .catch((error) => {
      alert("Error");
      console.error("Error removing document: ", error);
    });
}

//---------editar registro
function editar_form(vid, modelo, año, placa, estado, observacion) {
  document.getElementById("vid").value = vid;
  document.getElementById("modelo").value = modelo;
  document.getElementById("año").value = año;
  document.getElementById("placa").value = placa;
  document.getElementById("estado").value = estado;
  document.getElementById("observacion").value = observacion;
  mostrar("ver");

  document.getElementById("botong").style.display = "none";
  document.getElementById("botone").style.display = "block";
}

function editar() {
  var vid = document.getElementById("vid").value;
  var modelov = document.getElementById("modelo").value;
  var añov = document.getElementById("año").value;
  var placav = document.getElementById("placa").value;
  var estadov = document.getElementById("estado").value;
  var observacionv = document.getElementById("observacion").value;

  var vehiculoRef = db.collection("vehiculo").doc(vid);

  // Set the "capital" field of the city 'DC'
  return vehiculoRef
    .update({
      modelo: modelov,
      año: añov,
      placa: placav,
      estado: estadov,
      observacion: observacionv,
    })
    .then(function () {
      console.log("Document successfully updated!");
      document.getElementById("visualizar").style.display = "block";

      document.getElementById("modelo").value = "";
      document.getElementById("año").value = "";
      document.getElementById("placa").value = "";
      document.getElementById("estado").value = "";
      document.getElementById("observacion").value = "";
      mostrar("ocultar");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      alert("¡Error!");
      console.error("Error updating document: ", error);
    });
}
