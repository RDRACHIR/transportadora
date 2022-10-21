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
            <a class="nav-link active" aria-current="page" href="index.html">
              <span class="fas fa-home"></span>
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="servicios.html">
              <span class="fas fa-truck-loading "></span>
              Servicios
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="clientes.html">
              <span class="fas fa-user-friends"></span>
              Clientes
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="vehiculos.html">
              <span class="fas fa-truck-moving"></span>
              Vehiculos
            </a>
          </li>
          
        </ul>
      </div>
    </nav>

`;
