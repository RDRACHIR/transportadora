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
  var direccion = document.getElementById("direccion").value;
  var direcciondest = document.getElementById("direcciondest").value;
  var tipos = document.getElementById("tipos").value;
  var tipocs = document.getElementById("tipocs").value;
  var fecha = document.getElementById("fecha").value;
  var cliente = document.getElementById("cliente").value;
  var telefono = document.getElementById("telefono").value;

  var controld = 0;
  var controldd = 0;
  var controls = 0;
  var controlcs = 0;
  var controlf = 0;
  var controlc = 0;
  var controlt = 0;

  // Validaciones
  if (direccion != "") {
    controld = 1;
    document.getElementById("errord").style.display = "none";
    document.getElementById("direccion").style.border = "2px solid #616161";
  } else {
    document.getElementById("errord").style.display = "block";
    document.getElementById("direccion").style.border = "2px solid #C00";
  }

  if (direcciondest != "") {
    controldd = 1;
    document.getElementById("errordd").style.display = "none";
    document.getElementById("direcciondest").style.border = "2px solid #616161";
  } else {
    document.getElementById("errordd").style.display = "block";
    document.getElementById("direcciondest").style.border = "2px solid #C00";
  }

  if (tipos != "") {
    controls = 1;
    document.getElementById("errors").style.display = "none";
    document.getElementById("tipos").style.border = "2px solid #616161";
  } else {
    document.getElementById("errors").style.display = "block";
    document.getElementById("tipos").style.border = "2px solid #C00";
  }

  if (tipocs != "") {
    controlcs = 1;
    document.getElementById("errorcs").style.display = "none";
    document.getElementById("tipocs").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorcs").style.display = "block";
    document.getElementById("tipocs").style.border = "2px solid #C00";
  }

  if (fecha != "") {
    controlf = 1;
    document.getElementById("errorf").style.display = "none";
    document.getElementById("fecha").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorf").style.display = "block";
    document.getElementById("fecha").style.border = "2px solid #C00";
  }

  if (cliente != "") {
    controlc = 1;
    document.getElementById("errorc").style.display = "none";
    document.getElementById("cliente").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorc").style.display = "block";
    document.getElementById("cliente").style.border = "2px solid #C00";
  }

  if (telefono != "") {
    controlt = 1;
    document.getElementById("errort").style.display = "none";
    document.getElementById("telefono").style.border = "2px solid #616161";
  } else {
    document.getElementById("errort").style.display = "block";
    document.getElementById("telefono").style.border = "2px solid #C00";
  }

  // Llamado funcion agreagar
  if (
    (controld,
    controldd,
    controls,
    controlcs,
    controlf,
    controlc,
    controlt == 1)
  ) {
    agregar();
  }
}

//---------agregar servicio
function agregar() {
  var direccions = document.getElementById("direccion").value;
  var direcciondests = document.getElementById("direcciondest").value;
  var tiposs = document.getElementById("tipos").value;
  var tipocs = document.getElementById("tipocs").value;
  var fechas = document.getElementById("fecha").value;
  var clientes = document.getElementById("cliente").value;
  var telefonos = document.getElementById("telefono").value;

  db.collection("servicio")
    .add({
      direccion: direccions,
      direccion_destino: direcciondests,
      tipo_servicio: tiposs,
      tipo_camion: tipocs,
      fecha: fechas,
      cliente: clientes,
      telefono: telefonos,
    })
    .then((docRef) => {
      alert("El producto se guardo correctamente");
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      alert("Error");
      console.error("Error adding document: ", error);
    });

  document.getElementById("form").style.display = "none";
  document.getElementById("visualizar").style.display = "block";

  document.getElementById("direccion").value = "";
  document.getElementById("direcciondest").value = "";
  document.getElementById("tipos").value = "";
  document.getElementById("tipocs").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("cliente").value = "";
  document.getElementById("telefono").value = "";
}
//---------leer servicios
function leerservicio() {
  //---------consulta a la colección
  db.collection("servicio").onSnapshot((querySnapshot) => {
    document.getElementById("conservicio").innerHTML = "";
    querySnapshot.forEach((doc) => {
      //---------muestra la consulta
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`cliente => ${doc.data().cliente}`);
      document.getElementById("conservicio").innerHTML += `
							<tr>
              <td>${doc.data().cliente}</td>
								<td>${doc.data().direccion}</td>
								<td>${doc.data().direccion_destino}</td>
								<td>${doc.data().tipo_servicio}</td>
								<td>${doc.data().tipo_camion}</td>
								<td>${doc.data().fecha}</td>
								<td>${doc.data().telefono}</td>
								<td>
									<span class="fas fa-pen-square  iconed" id="iconed" title="Editar" onclick="llenar_form('${
                    doc.id
                  }', '${doc.data().direccion}', '${
        doc.data().direccion_destino
      }', '${doc.data().tipo_servicio}', '${doc.data().tipo_camion}', '${
        doc.data().fecha
      }', '${doc.data().cliente}', '${doc.data().telefono}')"></span>
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

function pregunta_el(sid) {
  //console.log(pid);
  if (confirm("¿Esta seguro de eliminar el registro?")) {
    eliminar(sid);
  } else {
    console.log("No se elimino");
  }
}

function eliminar(sid) {
  db.collection("servicio")
    .doc(sid)
    .delete()
    .then(() => {
      alert("El servicio se ha elimiando con exito");
      //console.log("Document successfully deleted!");
    })
    .catch((error) => {
      alert("Error");
      console.error("Error removing document: ", error);
    });
}

//---------editar registro

function llenar_form(
  sid,
  direccion,
  direccion_destino,
  tipo_servicio,
  tipo_camion,
  fecha,
  cliente,
  telefono
) {
  document.getElementById("sid").value = sid;
  document.getElementById("direccion").value = direccion;
  document.getElementById("direcciondest").value = direccion_destino;
  document.getElementById("tipos").value = tipo_servicio;
  document.getElementById("tipocs").value = tipo_camion;
  document.getElementById("fecha").value = fecha;
  document.getElementById("cliente").value = cliente;
  document.getElementById("telefono").value = telefono;
  mostrar("ver");
  document.getElementById("botong").style.display = "none";
  document.getElementById("botone").style.display = "block";
}

function editar() {
  var sid = document.getElementById("sid").value;
  var direccions = document.getElementById("direccion").value;
  var direcciondests = document.getElementById("direcciondest").value;
  var tiposs = document.getElementById("tipos").value;
  var tipocs = document.getElementById("tipocs").value;
  var fechas = document.getElementById("fecha").value;
  var clientes = document.getElementById("cliente").value;
  var telefonos = document.getElementById("telefono").value;

  var servicioRef = db.collection("servicio").doc(sid);

  // Set the "capital" field of the city 'DC'
  return servicioRef
    .update({
      direccion: direccions,
      direccion_destino: direcciondests,
      tipo_servicio: tiposs,
      tipo_camion: tipocs,
      fecha: fechas,
      cliente: clientes,
      telefono: telefonos,
    })
    .then(function () {
      console.log("Document successfully updated!");
      document.getElementById("visualizar").style.display = "block";

      document.getElementById("direccion").value = "";
      document.getElementById("direcciondest").value = "";
      document.getElementById("tipos").value = "";
      document.getElementById("tipocs").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("cliente").value = "";
      document.getElementById("telefono").value = "";
      mostrar("ocultar");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      alert("¡Error!");
      console.error("Error updating document: ", error);
    });
}
