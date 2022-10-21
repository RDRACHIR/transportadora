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
                <td>${doc.data().tipo_servicio}</td>
								<td>${doc.data().direccion}</td>
								<td>${doc.data().fecha}</td>
								<td>${doc.data().telefono}</td>
							</tr>
						
						`;
    });
  });
}

leerservicio();
