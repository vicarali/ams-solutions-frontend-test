# Test frontend de AMS Solutions

Repositorio con una posible implementación del test de frontend del proceso de selección de AMS Solutions.

## Ejecución de la aplicación

Todas las acciones que se pueden llevar a cabo en la aplicación (npm run ...) son las solicitadas en el enunciado del test:

1. start - Modo desarrollo
2. build - Compilación para modo Producción
3. test - Lanzamiento de tests
4. lint - Comprobación de código

## Tecnologías usadas

- Vite como bundler
- Vitest como entorno de tests unitarios (extensión de Vite que usa la misma sintaxis que Jest)
- Vanilla JavaScript como lenguaje de desarrollo y para implementar la lógica (servicios)
- React como framework JavaScript para la composición e implementación de vistas
- React Router para el enrutado/navegación entre páginas (navegación en SPA)

## Decisiones tomadas en la implementación

- Los tests unitarios cubren principalmente los ficheros de servicio (archivos JS), ya que es dónde se han extraído prácticamente toda la lógica de la aplicación
- Dada la sencillez de navegación y las pocas páginas, se ha optado por usar React Router en el modo declarativo, ya que es mucho más ligero, sencillo y rápido de implementar
- Puesto que se debía implementar una especie de sistema de caché para los datos de producto a nivel cliente, se ha optado por persistirlos usando localStorage, por lo que el estado que se gestiona desde React es mínimo
- El único estado y contexto que se comparte a nivel global en la aplicación (usando la Context API nativa de React) es el relacionado con el carrito. Esto es debido a que se necesita mostrar y actualizar la cantidad de ítems en éste en componentes separados
- El estilado de componentes se ha implementado principalmente usando CSS Modules, ya que aunque mantienen sencillez permiten estilar los componentes de forma local y separada
- Para las interacciones con la API se ha configurado un proxy en Vite para evitar errores de CORS (especialmente necesario para poder persistir la sesión de usuario para las respuestas de conteo de número de ítems en el correcto), por lo que las rutas de API que se encuentran alrededor de la aplicación son relativas. Esta configuración se puede encontrar en el archivo de configuración de Vite (vite.config.js)
