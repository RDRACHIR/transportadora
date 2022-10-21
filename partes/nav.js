document.getElementById("nav").innerHTML = `
	<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
       <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>MENU PRINCIPAL</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../administrador/dashboard.html">
              <span class="fas fa-home"></span>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/servicios.html">
              <span class="fas fa-truck-loading "></span>
              Servicios
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/cliente.html">
              <span class="fas fa-user-friends"></span>
              Clientes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/usuarios.html">
              <span class="fas fa-users-cog"></span>
              Usuarios
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/pqr.html">
              <span class="fas fa-paste"></span>
              PQRS
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/vehiculos.html">
              <span class="fas fa-truck-moving"></span>
              Vehiculos
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../administrador/reporte.html">
              <span class=" fas fa-coins"></span>
              Reporte gastos
            </a>
          </li>
          
        </ul>
      </div>
    </nav>

`;
