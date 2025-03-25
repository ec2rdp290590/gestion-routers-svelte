<script>
  // Importamos los estilos globales de Tailwind CSS
  import '../app.css';
  import { onMount } from 'svelte';
  
  // Estado para el tema oscuro
  let darkMode = false;
  
  // Función para alternar el tema oscuro/claro
  function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Verificar el tema guardado al cargar la página
  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode = true;
      document.documentElement.classList.add('dark');
    }
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
  <header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Sistema de Gestión de Routers</h1>
          <p class="text-blue-100">Administra tu inventario de routers y encuentra la mejor opción para cada caso</p>
        </div>
        <button 
          on:click={toggleDarkMode} 
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          aria-label="Cambiar tema"
        >
          {#if darkMode}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          {/if}
        </button>
      </div>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
  
  <footer class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Sistema de Gestión de Routers
          </h3>
          <p class="text-gray-300 mb-4">
            Solución profesional para la administración y selección de equipos de red según las necesidades específicas.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">Inicio</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">Documentación</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">Soporte Técnico</a></li>
            <li><a href="#" class="text-gray-300 hover:text-white transition-colors duration-200">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Boletín Informativo</h3>
          <p class="text-gray-300 mb-4">Suscríbete para recibir actualizaciones sobre nuevos routers y tecnologías.</p>
          <form class="flex">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              class="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button 
              type="submit" 
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Sistema de Gestión de Routers - Creado con SvelteKit</p>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Estilos adicionales */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(.dark) {
    color-scheme: dark;
  }
  
  :global(.dark body) {
    color: #e5e7eb;
  }
  
  /* Glassmorphism para el encabezado */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  /* Animación para el botón de tema */
  button svg {
    transition: transform 0.3s ease;
  }
  
  button:hover svg {
    transform: rotate(12deg);
  }
  
  /* Gradientes y sombras mejoradas */
  :global(.shadow-glow) {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }
  
  /* Animaciones para enlaces */
  a {
    transition: all 0.2s ease;
  }
  
  /* Mejoras para dispositivos móviles */
  @media (max-width: 640px) {
    header h1 {
      font-size: 1.5rem;
    }
  }
</style>
