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
  var tipog = document.getElementById("tipog").value;
  var fecha = document.getElementById("fecha").value;
  var valorf = document.getElementById("valorf").value;
  var responsable = document.getElementById("responsable").value;
  var dest = document.getElementById("dest").value;

  var controltg = 0;
  var controlf = 0;
  var controlvf = 0;
  var controlr = 0;
  var controld = 0;

  // Validaciones
  if (tipog != "") {
    controltg = 1;
    document.getElementById("errortg").style.display = "none";
    document.getElementById("tipog").style.border = "2px solid #616161";
  } else {
    document.getElementById("errortg").style.display = "block";
    document.getElementById("tipog").style.border = "2px solid #C00";
  }

  if (valorf != "") {
    controlvf = 1;
    document.getElementById("errorv").style.display = "none";
    document.getElementById("valorf").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorv").style.display = "block";
    document.getElementById("valorf").style.border = "2px solid #C00";
  }

  if (responsable != "") {
    controlr = 1;
    document.getElementById("errorr").style.display = "none";
    document.getElementById("responsable").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorr").style.display = "block";
    document.getElementById("responsable").style.border = "2px solid #C00";
  }

  if (dest != "") {
    controld = 1;
    document.getElementById("errordesc").style.display = "none";
    document.getElementById("dest").style.border = "2px solid #616161";
  } else {
    document.getElementById("errordesc").style.display = "block";
    document.getElementById("dest").style.border = "2px solid #C00";
  }

  if (fecha != "") {
    controlf = 1;
    document.getElementById("errorf").style.display = "none";
    document.getElementById("fecha").style.border = "2px solid #616161";
  } else {
    document.getElementById("errorf").style.display = "block";
    document.getElementById("fecha").style.border = "2px solid #C00";
  }

  // Llamado funcion agreagar
  if ((controltg, controlf, controlvf, controlr, controld == 1)) {
    agregar();
  }
}

//---------agregar servicio
function agregar() {
  var tipogasto = document.getElementById("tipog").value;
  var fechar = document.getElementById("fecha").value;
  var valorfactura = document.getElementById("valorf").value;
  var respon = document.getElementById("responsable").value;
  var description = document.getElementById("dest").value;

  db.collection("reporteGastos")
    .add({
      tipoGasto: tipogasto,
      fecha: fechar,
      valor: valorfactura,
      responsable: respon,
      descripcion: description,
    })
    .then((docRef) => {
      alert("El reporte se guardo correctamente");
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      alert("Error");
      console.error("Error adding document: ", error);
    });

  document.getElementById("form").style.display = "none";
  document.getElementById("visualizar").style.display = "block";

  document.getElementById("tipog").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("valorf").value = "";
  document.getElementById("responsable").value = "";
  document.getElementById("dest").value = "";
}
//---------leer servicios
function leerservicio() {
  //---------consulta a la colección
  db.collection("reporteGastos").onSnapshot((querySnapshot) => {
    document.getElementById("conreporte").innerHTML = "";
    querySnapshot.forEach((doc) => {
      //---------muestra la consulta
      //console.log(`${doc.id} => ${doc.data()}`);
      //console.log(`cliente => ${doc.data().cliente}`);
      document.getElementById("conreporte").innerHTML += `
							<tr>
              <td>${doc.data().tipoGasto}</td>
								<td>${doc.data().fecha}</td>
								<td>${doc.data().valor}</td>
								<td>${doc.data().responsable}</td>
								<td>${doc.data().descripcion}</td>
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
function pregunta_el(rid) {
  //console.log(pid);
  if (confirm("¿Esta seguro de eliminar el registro?")) {
    eliminar(rid);
  } else {
    console.log("No se elimino");
  }
}

function eliminar(rid) {
  db.collection("reporteGastos")
    .doc(rid)
    .delete()
    .then(() => {
      alert("El reporte se ha elimiando con exito");
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
