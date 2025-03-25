// Importamos la base de datos (simulada en memoria)
import { error, redirect } from '@sveltejs/kit';

/** 
 * Base de datos simulada en memoria
 * Recordatorio para J Montes Ok :) En una aplicación real, esto sería reemplazado por una conexión a una base de datos real
 */
let db = {
  routers: [
    {
      id: '1',
      modelo: 'TP-Link Archer AX50',
      tipo: 'inalambrico',
      velocidad: '1800',
      recomendadoPara: 'Hogar con múltiples dispositivos'
    },
    {
      id: '2',
      modelo: 'Cisco RV345',
      tipo: 'vpn',
      velocidad: '1000',
      recomendadoPara: 'Pequeñas y medianas empresas'
    },
    {
      id: '3',
      modelo: 'MikroTik CCR1036',
      tipo: 'core',
      velocidad: '10000',
      recomendadoPara: 'Proveedores de servicios de Internet'
    }
  ]
};

/**
 * Función load del lado del servidor
 * Esta función se ejecuta en el servidor y proporciona datos a la página
 * @returns {Object} Datos que serán accesibles en el componente de la página
 */
export function load() {
  // En una aplicación real, aquí se consultaría una base de datos
  return {
    routers: db.routers
  };
}

/**
 * Acciones del formulario
 * Estas funciones manejan las solicitudes POST desde los formularios
 */
export const actions = {
  /**
   * Acción para crear un nuevo router
   * @param {Object} request - Objeto de solicitud que contiene los datos del formulario
   */
  create: async ({ request }) => {
    // Obtenemos los datos del formulario
    const formData = await request.formData();
    
    // Creamos un nuevo objeto router con un ID único
    const newRouter = {
      id: Date.now().toString(), // Generamos un ID único basado en la marca de tiempo
      modelo: formData.get('modelo'),
      tipo: formData.get('tipo'),
      velocidad: formData.get('velocidad'),
      recomendadoPara: formData.get('recomendadoPara')
    };
    
    // Agregamos el nuevo router a nuestra "base de datos"
    db.routers = [...db.routers, newRouter];
    
    // No es necesario redirigir ya que SvelteKit recargará la página automáticamente
    return { success: true };
  },
  
  /**
   * Acción para actualizar un router existente
   * @param {Object} request - Objeto de solicitud que contiene los datos del formulario
   */
  update: async ({ request }) => {
    // Obtenemos los datos del formulario
    const formData = await request.formData();
    const id = formData.get('id');
    
    // Verificamos que el ID exista
    if (!id) {
      throw error(400, 'ID de router no proporcionado');
    }
    
    // Actualizamos el router en nuestra "base de datos"
    db.routers = db.routers.map(router => {
      if (router.id === id) {
        return {
          id,
          modelo: formData.get('modelo'),
          tipo: formData.get('tipo'),
          velocidad: formData.get('velocidad'),
          recomendadoPara: formData.get('recomendadoPara')
        };
      }
      return router;
    });
    
    return { success: true };
  },
  
  /**
   * Acción para eliminar un router
   * @param {Object} request - Objeto de solicitud que contiene el ID del router a eliminar
   */
  delete: async ({ request }) => {
    // Obtenemos los datos del formulario
    const formData = await request.formData();
    const id = formData.get('id');
    
    // Verificamos que el ID exista
    if (!id) {
      throw error(400, 'ID de router no proporcionado');
    }
    
    // Eliminamos el router de nuestra "base de datos"
    db.routers = db.routers.filter(router => router.id !== id);
    
    return { success: true };
  }
};
