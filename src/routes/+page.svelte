<script>
  // Importamos los datos que vienen del servidor mediante la función load
  export let data;
  
  // Estado local para el formulario de creación/edición
  let editingRouter = null;
  let formData = {
    id: '',
    modelo: '',
    tipo: '',
    velocidad: '',
    recomendadoPara: ''
  };
  
  // Función para iniciar la edición de un router
  function editRouter(router) {
    formData = { ...router };
    editingRouter = router.id;
  }
  
  // Función para cancelar la edición
  function cancelEdit() {
    editingRouter = null;
    resetForm();
  }
  
  // Función para resetear el formulario
  function resetForm() {
    formData = {
      id: '',
      modelo: '',
      tipo: '',
      velocidad: '',
      recomendadoPara: ''
    };
  }
  
  // Tipos de router para el selector
  const tiposRouter = [
    { value: 'inalambrico', label: 'Router Inalámbrico' },
    { value: 'cableado', label: 'Router Cableado' },
    { value: 'vpn', label: 'Router VPN' },
    { value: 'edge', label: 'Router Edge' },
    { value: 'core', label: 'Router Core' }
  ];
  
  // Función para obtener el color de fondo según el tipo de router
  function getRouterTypeColor(tipo) {
    const colors = {
      'inalambrico': 'from-blue-400 to-cyan-300',
      'cableado': 'from-green-400 to-emerald-300',
      'vpn': 'from-purple-400 to-indigo-300',
      'edge': 'from-orange-400 to-amber-300',
      'core': 'from-red-400 to-rose-300'
    };
    return colors[tipo] || 'from-gray-400 to-gray-300';
  }
  
  // Función para obtener el color de texto según el tipo de router
  function getRouterTypeTextColor(tipo) {
    const colors = {
      'inalambrico': 'text-blue-700',
      'cableado': 'text-green-700',
      'vpn': 'text-purple-700',
      'edge': 'text-orange-700',
      'core': 'text-red-700'
    };
    return colors[tipo] || 'text-gray-700';
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  <div class="container mx-auto p-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Gestión de Routers
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Sistema profesional para administrar inventario de routers y encontrar la solución óptima para cada necesidad
      </p>
    </div>
    
    <!-- Formulario para crear o editar routers -->
    <div class="bg-white rounded-2xl p-8 mb-10 shadow-xl backdrop-blur-sm bg-opacity-80 border border-gray-100">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span class="inline-block w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-3 flex items-center justify-center text-white">
          {editingRouter ? '✏️' : '➕'}
        </span>
        {editingRouter ? 'Editar Router' : 'Agregar Nuevo Router'}
      </h2>
      
      <!-- Utilizamos el atributo form action para enviar datos al servidor -->
      <form method="POST" action="?/{editingRouter ? 'update' : 'create'}" class="space-y-6">
        <!-- Campo oculto para el ID en caso de edición -->
        {#if editingRouter}
          <input type="hidden" name="id" value={formData.id} />
        {/if}
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="modelo" class="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <div class="relative">
              <input
                type="text"
                id="modelo"
                name="modelo"
                bind:value={formData.modelo}
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white bg-opacity-90"
                placeholder="TP-Link Archer C6"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="tipo" class="block text-sm font-medium text-gray-700 mb-1">Tipo de Router</label>
            <div class="relative">
              <select
                id="tipo"
                name="tipo"
                bind:value={formData.tipo}
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white bg-opacity-90 appearance-none"
              >
                <option value="" disabled>Selecciona un tipo</option>
                {#each tiposRouter as tipo}
                  <option value={tipo.value}>{tipo.label}</option>
                {/each}
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="velocidad" class="block text-sm font-medium text-gray-700 mb-1">Velocidad (Mbps)</label>
            <div class="relative">
              <input
                type="text"
                id="velocidad"
                name="velocidad"
                bind:value={formData.velocidad}
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white bg-opacity-90"
                placeholder="1000"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="recomendadoPara" class="block text-sm font-medium text-gray-700 mb-1">Recomendado Para</label>
            <div class="relative">
              <input
                type="text"
                id="recomendadoPara"
                name="recomendadoPara"
                bind:value={formData.recomendadoPara}
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white bg-opacity-90"
                placeholder="Hogar, Pequeña empresa, etc."
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          {#if editingRouter}
            <button 
              type="button" 
              on:click={cancelEdit}
              class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 shadow-sm"
            >
              Cancelar
            </button>
          {/if}
          <button 
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md"
          >
            {editingRouter ? 'Actualizar' : 'Agregar'} Router
          </button>
        </div>
      </form>
    </div>
    
    <!-- Tabla de routers -->
    <div class="bg-white rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm bg-opacity-80 border border-gray-100 mb-12">
      <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <h2 class="text-2xl font-bold text-gray-800">Routers Registrados</h2>
        <p class="text-gray-600">Gestiona tu inventario de dispositivos de red</p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Velocidad</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recomendado Para</th>
              <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#if data.routers.length === 0}
              <tr>
                <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
                  <div class="flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p>No hay routers registrados. Agrega uno nuevo.</p>
                  </div>
                </td>
              </tr>
            {:else}
              {#each data.routers as router}
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r {getRouterTypeColor(router.tipo)} flex items-center justify-center text-white font-bold">
                        {router.modelo.charAt(0)}
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{router.modelo}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r {getRouterTypeColor(router.tipo)} text-white">
                      {tiposRouter.find(t => t.value === router.tipo)?.label || router.tipo}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm {getRouterTypeTextColor(router.tipo)}">{router.velocidad} Mbps</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{router.recomendadoPara}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex justify-end space-x-2">
                      <button 
                        on:click={() => editRouter(router)}
                        class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-1 transition-all duration-200"
                      >
                        Editar
                      </button>
                      
                      <!-- Formulario para eliminar un router -->
                      <form method="POST" action="?/delete" class="inline">
                        <input type="hidden" name="id" value={router.id} />
                        <button 
                          type="submit"
                          class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1 transition-all duration-200"
                        >
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Sección informativa sobre tipos de routers -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {#each tiposRouter as tipo}
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
          <div class="h-3 bg-gradient-to-r {getRouterTypeColor(tipo.value)}"></div>
          <div class="p-6">
            <h3 class="font-bold text-xl mb-2 {getRouterTypeTextColor(tipo.value)}">{tipo.label}</h3>
            <p class="text-gray-600 text-sm">
              {#if tipo.value === 'inalambrico'}
                Ideal para hogares y pequeñas oficinas. Proporciona conectividad WiFi y generalmente incluye puertos Ethernet para conexiones cableadas.
              {:else if tipo.value === 'cableado'}
                Ofrece mayor estabilidad y velocidad a través de conexiones Ethernet. Recomendado para entornos donde la fiabilidad es crítica.
              {:else if tipo.value === 'vpn'}
                Incluye capacidades de Red Privada Virtual integradas. Ideal para empresas con trabajadores remotos o múltiples ubicaciones.
              {:else if tipo.value === 'edge'}
                Se sitúa en el borde de la red y conecta con redes externas como Internet. Proporciona seguridad y control de tráfico.
              {:else if tipo.value === 'core'}
                Forma parte del núcleo de grandes redes. Maneja grandes volúmenes de tráfico y proporciona rutas óptimas entre diferentes partes de la red.
              {/if}
            </p>
          </div>
          <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100">
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full bg-gradient-to-r {getRouterTypeColor(tipo.value)} mr-2"></div>
              <span class="text-xs text-gray-500">Velocidad típica: 
                {#if tipo.value === 'inalambrico'}
                  300-1200 Mbps
                {:else if tipo.value === 'cableado'}
                  1000-10000 Mbps
                {:else if tipo.value === 'vpn'}
                  500-2000 Mbps
                {:else if tipo.value === 'edge'}
                  1000-40000 Mbps
                {:else if tipo.value === 'core'}
                  10000-100000 Mbps
                {/if}
              </span>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Sección de comparativa -->
    <div class="bg-white rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm bg-opacity-80 border border-gray-100 mb-12">
      <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Comparativa de Routers
        </h2>
        <p class="text-gray-600">Encuentra la mejor opción según el caso de uso</p>
      </div>
      
      <div class="p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Router</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hogar</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pequeña Empresa</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mediana Empresa</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gran Empresa</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISP</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each tiposRouter as tipo}
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r {getRouterTypeColor(tipo.value)} text-white">
                      {tipo.label}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if tipo.value === 'inalambrico'}
                      <span class="text-green-600">★★★★★</span>
                    {:else if tipo.value === 'cableado'}
                      <span class="text-green-600">★★★★</span>
                    {:else if tipo.value === 'vpn'}
                      <span class="text-green-600">★★★</span>
                    {:else if tipo.value === 'edge'}
                      <span class="text-gray-400">★</span>
                    {:else if tipo.value === 'core'}
                      <span class="text-gray-400">-</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if tipo.value === 'inalambrico'}
                      <span class="text-green-600">★★★★</span>
                    {:else if tipo.value === 'cableado'}
                      <span class="text-green-600">★★★★★</span>
                    {:else if tipo.value === 'vpn'}
                      <span class="text-green-600">★★★★</span>
                    {:else if tipo.value === 'edge'}
                      <span class="text-green-600">★★</span>
                    {:else if tipo.value === 'core'}
                      <span class="text-gray-400">-</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if tipo.value === 'inalambrico'}
                      <span class="text-green-600">★★</span>
                    {:else if tipo.value === 'cableado'}
                      <span class="text-green-600">★★★</span>
                    {:else if tipo.value === 'vpn'}
                      <span class="text-green-600">★★★★★</span>
                    {:else if tipo.value === 'edge'}
                      <span class="text-green-600">★★★★</span>
                    {:else if tipo.value === 'core'}
                      <span class="text-green-600">★★</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if tipo.value === 'inalambrico'}
                      <span class="text-gray-400">★</span>
                    {:else if tipo.value === 'cableado'}
                      <span class="text-green-600">★★</span>
                    {:else if tipo.value === 'vpn'}
                      <span class="text-green-600">★★★</span>
                    {:else if tipo.value === 'edge'}
                      <span class="text-green-600">★★★★★</span>
                    {:else if tipo.value === 'core'}
                      <span class="text-green-600">★★★★★</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if tipo.value === 'inalambrico'}
                      <span class="text-gray-400">-</span>
                    {:else if tipo.value === 'cableado'}
                      <span class="text-gray-400">-</span>
                    {:else if tipo.value === 'vpn'}
                      <span class="text-gray-400">★</span>
                    {:else if tipo.value === 'edge'}
                      <span class="text-green-600">★★★</span>
                    {:else if tipo.value === 'core'}
                      <span class="text-green-600">★★★★★</span>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Estilos adicionales */
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    color: #333;
  }
  
  /* Animaciones y transiciones */
  .form-group {
    position: relative;
    transition: all 0.3s ease;
  }
  
  .form-group:focus-within label {
    color: #3b82f6;
    font-weight: 500;
  }
  
  input, select {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  input:focus, select:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  
  /* Glassmorphism para tarjetas */
  .bg-opacity-80 {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  
  /* Mejoras para dispositivos móviles */
  @media (max-width: 640px) {
    .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
  }
  
  /* Animación de carga */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .saving {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
