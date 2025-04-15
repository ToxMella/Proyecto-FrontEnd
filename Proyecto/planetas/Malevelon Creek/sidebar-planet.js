// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuBtn = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('aside');
    const mainContent = document.querySelector('main');
    const tooltips = document.querySelectorAll('.tooltip');
    
    // Estado inicial
    let isCollapsed = false;
    
    // Función para alternar el estado de la sidebar
    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        document.body.classList.toggle('collapsed', isCollapsed);
        
        // Cambiar ícono del botón
        if (isCollapsed) {
            menuBtn.classList.replace('fa-chevron-left', 'fa-chevron-right');
            // Añadir evento de hover para tooltips
            addTooltipHover();
        } else {
            menuBtn.classList.replace('fa-chevron-right', 'fa-chevron-left');
            // Remover evento de hover
            removeTooltipHover();
        }
        
        // Guardar estado en localStorage
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }
    
    // Función para añadir efecto hover a tooltips
    function addTooltipHover() {
        document.querySelectorAll('.menu-items li').forEach(item => {
            item.addEventListener('mouseenter', showTooltip);
            item.addEventListener('mouseleave', hideTooltip);
        });
    }
    
    // Función para remover efecto hover de tooltips
    function removeTooltipHover() {
        document.querySelectorAll('.menu-items li').forEach(item => {
            item.removeEventListener('mouseenter', showTooltip);
            item.removeEventListener('mouseleave', hideTooltip);
        });
    }
    
    // Mostrar tooltip
    function showTooltip(e) {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        }
    }
    
    // Ocultar tooltip
    function hideTooltip(e) {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }
    }
    
    // Cargar estado guardado
    function loadSidebarState() {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            isCollapsed = true;
            document.body.classList.add('collapsed');
            menuBtn.classList.replace('fa-chevron-left', 'fa-chevron-right');
            addTooltipHover();
        }
    }
    
    // Eventos
    menuBtn.addEventListener('click', toggleSidebar);
    
    // Cerrar sidebar al hacer clic fuera (en pantallas pequeñas)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuBtn) {
            if (!isCollapsed) {
                toggleSidebar();
            }
        }
    });
    
    // Responsive: Colapsar automáticamente en móviles
    function handleResponsive() {
        if (window.innerWidth <= 768 && !isCollapsed) {
            toggleSidebar();
        }
    }
    
    // Inicialización
    loadSidebarState();
    window.addEventListener('resize', handleResponsive);
    handleResponsive(); // Ejecutar al cargar
  });
  
  // Efecto de resaltado al pasar el mouse (modo colapsado)
  sidebar.addEventListener('mouseenter', function() {
    if (isCollapsed) {
        sidebar.style.width = '200px';
    }
  });
  
  sidebar.addEventListener('mouseleave', function() {
    if (isCollapsed) {
        sidebar.style.width = COLLAPSED_WIDTH + 'px';
    }
  });
  
  
  