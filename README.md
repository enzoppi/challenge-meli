# challenge-meli
Challenge Técnico Mercado Libre

Para correr la aplicación, es necesario entrar a la carpeta de cada proyecto por separado por consola y correr el comando *npm start*
  - Backend: *challenge-meli-api* - se inicia con *npm start* y corre en el puerto **9000**
  - Frontend: *challenge-meli-client* - se inicia con *npm start* y corre en el puerto **3000**

## Notas

### Breadcrumb
Para armar el breadcrumb de la vista de resultados, reemplacé la propiedad *categories*, que en un principio tenía todas las categorías disponibles en los filtros. Luego, al desarrollar la vista de detalles, tenía una nota de que el DTO no tenía propiedad para los breadcrumbs.
En retrospectiva, la solución correcta podría haber sido utilizar la implementación original que hice para *categories* y agregar una propiedad *breadcrumb* a ambos DTO para ese uso específico. Pero en el momento utilicé la propiedad *categories* (y la agregué al DTO del detalle).
En el proceso noté que para armar el breadcrumb de los resultados no hacía falta llamar a la API de **Categories** ya que los datos estaban en las propiedades de *filters* y *available_filters*.

### Currency
Para encontrar los decimales de la moneda, fue necesario llamar a la API de **Currencies**, ya que el dato faltaba en la respuesta de **Search**. Con ese fin, opté por traer todos los datos y trabajar con ellos en memoria, para ahorrar el costo de hacer una nueva llamada por cada item individual, aprovechando que, incluso en el peor de los casos, la cantidad de resultados (monedas) es reducida y manejable en memoria.

### SEO
En el caso de SEO, Google indexa correctamente las páginas generadas por *react-router*, no hacía falta ignorar rutas en robots.txt y los meta tags importantes fueron generados automáticamente por *create-react-app*. Sólo hizo falta modificar su contenido.

### Estructura del backend
Opté por modularizar lo mejor posible la api, y abstraer al **controller** de la comunicación con la API externa y de la transformación de los datos de esa API al DTO propio. Sin embargo, la arquitectura del proyecto es de mi propia creación (intuición y experiencia) y puede no respetar convenciones del framework.

### TypeScript
Me hubiera gustado mucho usar TypeScript en el proyecto para crear modelos e interfaces para los DTO y demás manejo de datos, pero preferí no agregar complejidad al proyecto por su tamaño y simplicidad.
