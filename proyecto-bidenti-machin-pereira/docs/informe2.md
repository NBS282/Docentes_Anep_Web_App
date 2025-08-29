# Informe académico (entrega 2)

## Construcción

### Implementación de funciones principales


El sistema permite la creación y gestión de planificaciones semanales y diarias para maestras/os de primaria, alineadas con las pautas de la ANEP. Entre las funciones principales se incluyen:

- **Gestión de cursos**: Crear, modificar y eliminar cursos.

    - Agregar Curso: Permite al usuario añadir cursos con nombre y año (de 1º a 9º).
    - Modificar Curso: Ofrece la opción de editar detalles de cursos existentes, se selecciona el curso y se cambia nombre y/o año del mismo.
    - Eliminar Curso: Ofrece la opción de eliminar cursos existentes, se selecciona el curso y se elimina el mismo.

- **Creación de Planificaciones**

    - Flujo General:
        - Selección de curso (existente o valor por defecto "Primer Grado").
        - Elección de modalidad (Semanal o Diaria).
        - Llenado de información según los estándares de ANEP (semanal y estructurada en diaria).
        - Creación de bloques
        - Selección de Fecha 
        - Confirmación para guardar la planificación.

    - Desde el js:
        - Uso de funciones como startPlanificacion para inicializar el proceso y savePlan/savePlanSemanal para guardar los datos en listaPlanificaciones.
        - Validación de bloques y planificaciones mediante verificacionDeBloques y verificacionDePlanificaciones.

- **Visualización, búsqueda y Gestión de Planificaciones**: Dentro de la sección principal de la página se muestran las planificaciones creadas, pudiendo filtrar las mismas por título, tipo o fecha. Al acceder a las mismas se podrá crear, editar y eliminar bloques creados.

- Funciones desde la visión de código: 

    - El archivo main.js actúa como un punto central que organiza las funcionalidades principales del proyecto, importando y exportando funciones desde diferentes módulos. Se utiliza un enfoque modular para dividir responsabilidades, lo que facilita la mantenibilidad y escalabilidad del código.

    - Variables Globales:

        - variables: Objeto que contiene elementos clave para el funcionamiento del sistema, como la lista de planificaciones (listaPlanificaciones), la lista de cursos (laListaDeCursos), y elementos de interacción como startDateInput.
        - Métodos dentro de variables: largoListaPlanificaciones, que devuelve el número de planificaciones creadas.

    - Módulos:

        - Configuración de Cursos: Manejo de cursos mediante funciones como por ejemplo agregarCurso, modificarCurso y eliminarCurso.

        - Planificación: Inicio y validación de procesos con funciones como por ejemplo startPlanificacion, verificacionDeBloques y savePlan.

        - Visualización: Gestión de interfaz y vistas mediante funciones importadas desde mostrarVisualizacion.js.

        - Calendario: Gestión de la visualización del calendario tanto semanal como diario y las funciones del mismo desde calendario.js

        - Gestión de Bloques: desde creacionBloquesPlanificacion.js 

        - Búsqueda: Gestión de las búsquedas entre las planificaciones desde busquedaDePlanificaciones.js


### Librerías externas

- **Bootstrap**: fue introducida al equipo por parte del profesor, se utilizó para estilizar la página web y hacerla responsive. 

- **Moment**: esta librería la encontramos por cuenta propia, y se utilizó para facilitar en gran medida el ingreso de fecha para la planificación semanal.

- **Jquery**: de las varias funcionalidades de jquery nosotros utilizamos la librería para algunas animaciones de la página.

## Interfaz de usuario

### Buenas prácticas

- **Diseño de Interfaz**:

    - Cada sección presenta opciones relevantes para la tarea, como "Crear Planificación", eliminando elementos innecesarios que puedan confundir.
    - Mensajes claros, como “¡Vaya!, parece que no has creado una planificación”, guían al usuario en los pasos a seguir.
    - Los botones de acción, como "Crear", "Modificar" y "Eliminar", tienen colores llamativos (azul, amarillo, rojo) que facilitan su identificación. Este esquema de colores asegura claridad y sigue principios de percepción visual.
    - Los íconos intuitivos, como el de "Casa" para volver al inicio, hacen que la navegación sea más comprensible, especialmente para maestras no familiarizadas con sistemas digitales.
    - Se respeta la jerarquía visual: títulos, campos y botones están alineados, con espaciado uniforme entre elementos para un diseño limpio y ordenado.

- **Accesibilidad y Contraste**

  - Los colores cumplen con los estándares WCAG para contraste, asegurando legibilidad incluso para usuarios con problemas visuales. Por ejemplo, los botones "Crear" en azul y "Eliminar" en rojo son claros y fácilmente distinguibles.
  - Los elementos interactivos son lo suficientemente grandes y están bien espaciados, lo que mejora su uso en pantallas táctiles y por personas con movilidad limitada.

### Usabilidad

- **Responsividad**

   - La interfaz es responsive, adaptándose automáticamente a diferentes dispositivos, como móviles, tablets y escritorios.
   - Botones, menús y campos se redimensionan y reordenan usando contenedores, garantizando que la funcionalidad no se pierda en ninguna resolución.
   - Se realizaron pruebas en dispositivos como iPhone 14 Pro Max, Samsung Galaxy S20 Ultra y escritorios con resoluciones de 1440x900 px y 1920x1080 px. Los navegadores con los que hicimos las pruebas fueron Firefox 133.0, Chrome 133.0, Edge 128.0.2739.107 y Opera GX 102.0.4880.117. [Para el caso de los dispositivos móviles utilizamos las herramientas de visualización de los mismos presentes en dichos navegadores de escritorio].

- **Flujo de Usuario**

    - Sigue un flujo lógico y natural: buscar o crear una planificación, completar detalles y finalizar.
    - Botones y etiquetas explican cada acción de manera clara. Por ejemplo, el mensaje “¡Vaya!, parece que no has creado una planificación” dirige al usuario al botón "Crear Planificación", tras lo cual se despliega una barra que guía al siguiente paso.

- **Consistencia**

    - Uso uniforme de fuentes, tamaños, colores y estilos en toda la interfaz, mejorando la coherencia visual y funcional.
    - Las acciones relacionadas (agregar, modificar, eliminar) están agrupadas bajo categorías como "Cursos", facilitando su localización.

- **Estructura Accesible**

    - Cada acción genera un mensaje emergente, ya sea de confirmación o error, informando al usuario sobre el resultado de sus acciones.
    - Menús laterales y secciones organizadas de forma lógica, simplificando la búsqueda de funciones.

### Accesibilidad

La interfaz está diseñada para que maestras puedan acceder fácilmente desde dispositivos móviles, tablets o escritorios, independientemente de su familiaridad con herramientas digitales.

- Acceso desde diferentes dispositivos: La interfaz responsive permite una experiencia fluida en cualquier tamaño de pantalla, optimizando la navegación en dispositivos táctiles y de escritorio.

- Diseño centrado en el usuario: Elementos interactivos como botones y formularios son grandes y están diseñados para ser fáciles de usar.

- Contenido accesible: Los mensajes son claros y los botones intuitivos, reduciendo confusión y asegurando una experiencia inclusiva.

- Principios de descubrimiento y feedback: Los elementos interactivos son identificables, y cada acción genera una respuesta visual o un mensaje que guía al usuario sobre el estado actual o los cambios realizados.

La accesibilidad y la usabilidad aseguran que la plataforma sea eficiente, intuitiva y adecuada para maestras/os, el público objetivo principal.


## Codificación

### Configuración de entorno de desarrollo


- **Carpeta domain**: Tiene la lógica principal del sistema y los tests para validar su correcto funcionamiento.

- **Carpeta interface**: Contiene todo lo relacionado con la presentación. Incluye una subcarpeta llamada Funciones, donde se encapsulan las funciones específicas para distintas partes de la interfaz. Estas son coordinadas desde el archivo main.js, el cual actúa como punto de control.

- **Estructura HTML y estilos CSS**:
    - El archivo index.html contiene la estructura principal de la página, sirviendo como punto de entrada.
    - El archivo style.css gestiona todos los estilos visuales, asegurando un diseño consistente y atractivo.

- **Control de versiones**: Se trabajó en una rama llamada entregable_2 para aislar los avances y mantener la estabilidad de la rama principal (main).

- **Estándares del entorno**:

    - El código se desarrolló usando Visual Studio Code con configuraciones específicas:
        
        - Se usaron extensiones como Prettier y ESLint para mantener un formato uniforme y detectar problemas de codificación.
        
        - Se realizaron pruebas fuera de la IDE para garantizar portabilidad y evitar dependencias específicas del entorno de desarrollo

### Estándares de codificación

Se siguieron estándares para garantizar consistencia, legibilidad y mantenibilidad del código:

- **Indentación y agrupamiento**: Se utilizó un número fijo de espacios (2) para indentación, asegurando una organización clara de las estructuras.
    
- **Nombres descriptivos**: Las variables y funciones tienen nombres claros y específicos, como agregarCurso y mostrarPlanificaciones, evitando redundancias y facilitando la comprensión del código.

- **Espaciado uniforme**: El uso de líneas en blanco entre bloques funcionales mejora la legibilidad.

- **Herramientas**:
        
    - Prettier: Garantizó un formato uniforme en archivos HTML, CSS y JS, alineándose con la recomendación de "consistencia sobre estilo específico".
    - ESLint: Detectó errores y garantizó el cumplimiento de estándares modernos de JavaScript (ES6).

- **Simplicidad y portabilidad**:

    - No se incluyó código comentado o funcionalidades innecesarias, cumpliendo con el principio de evitar "código futuro"​
    
    - La página no depende de rutas absolutas o específicas del entorno, asegurando que sea portable y funcional en cualquier máquina o servidor.

### Buenas prácticas de OOP


- **Encapsulamiento**:
    
    - Las clases, como ListaCursos, protegen los datos internos y exponen solo métodos necesarios como agregarCurso y eliminarCurso.
        
    - Esto cumple con la recomendación de ocultar información innecesaria y reducir la cantidad de elementos públicos​

- **Simplicidad y modularización**:

    - Cada módulo tiene una única responsabilidad, como la lógica de los cursos o la gestión de bloques de planificación, cumpliendo con el principio de evitar "clases grandes" y "code smells".

- **Evitar complejidad innecesaria**:

    - Las funciones están diseñadas para ser cortas y claras, evitando estructuras complejas o condicionales anidados​


### Análisis estático de código


**Herramientas utilizadas**

 - ESLint: Identificó errores de sintaxis, variables sin uso y problemas de consistencia en el código JavaScript.
 
 - Prettier: Uniformizó el formato del código, evitando inconsistencias visuales que dificulten el trabajo en equipo.
 
 - Wave: Validó accesibilidad en la interfaz, identificando problemas como falta de etiquetas alt o contrastes insuficientes.

**Calidad del código**:

 - Se evitó duplicación, siguiendo el principio DRY (Don't Repeat Yourself).
 - Las estructuras de control y funciones cumplen con límites razonables de líneas y parámetros, evitando "clases grandes" o "condicionales complejos"​
 - No se dejaron warnings sin atender en la IDE, alineándose con las recomendaciones para mantener un enfoque en problemas críticos​

Además, en casos donde el análisis estático no fue suficiente, se recurrió al uso de console.log() y alert() para depurar los valores de las variables durante la ejecución. Esto ayudó a comprender mejor el flujo del programa y a encontrar la causa raíz de los problemas.

## Checkpoint obligatorio 2

- Interfaz de usuario: Implementación completa de las páginas principales.
- Funciones: Creación y gestión de planificaciones, búsqueda y visualización funcional.
- Clases de dominio: Manejo básico de datos como cursos y planificaciones.

## Test unitario

### Buenas prácticas


Se utilizó beforeEach() para inicializar el estado antes de cada prueba, asegurando que cada test sea independiente de los demás y que el resultado de una prueba no afecte a las siguientes. [ Principio ATRIP (Independence) ] 

Se diseñaron pruebas unitarias para cubrir escenarios positivos, negativos y casos de borde. Esto asegura un manejo adecuado de errores y un funcionamiento correcto en situaciones límite. Las pruebas fueron diseñadas para ser profundas y abarcar líneas de código, branches y excepciones, alineándose con el principio Thoroughness (Profundidad)​

Las pruebas se ejecutan de manera automática utilizando el framework Jest, reduciendo la necesidad de verificaciones manuales. Esto asegura que los tests sean automáticos y repetibles, cumpliendo con el principio ATRIP (Automatic y Repeatable)​

Cada prueba está enfocada en una única funcionalidad, siguiendo el principio de "probar una única cosa". Esto reduce la complejidad y asegura claridad en los resultados. Se respeta el antipatrón que advierte contra pruebas demasiado largas o dependientes​

Se utilizaron verificaciones automáticas con toBe, toEqual y toThrow, asegurando que los resultados sean precisos y comparando el estado esperado con el real.

### Informe de cobertura

Se utilizó una herramienta integrada con Jest para medir la cobertura de las pruebas. El análisis asegura que todas las líneas de código en los archivos del dominio estén probadas. Se alcanzó un 100% de cobertura de líneas en el dominio, validando que cada parte de la lógica del sistema está debidamente probada.

Las pruebas incluyen cursos normales y casos excepcionales, manejando entradas válidas e inválidas para simular posibles errores en producción. Garantiza una cobertura profunda y completa, alineada con el principio de verificar cursos normales, alternativos y excepcionales​

Se probaron escenarios límite, como listas vacías o valores extremos, asegurando que el sistema se comporte correctamente en condiciones no ideales. Cumple con la checklist de pruebas al incluir escenarios que podrían provocar errores si no se manejan adecuadamente.

## Reflexión

### Detalle del trabajo individual


| Alumno          | Fecha        | Actividad                                                                                                                          | Cantidad de horas |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Nicolas Bidenti  | 4/11         | diseño página web                                                                   | 4                 |
| Nicolas Bidenti, Nicolas Machin, Martín Pereira | 5/11 | creación de clases del dominio/primer caso de uso de la página | 6 |
| Nicolas Bidenti, Nicolas Machin, Martín Pereira | 6/11 | corrección de bugs, creación de tests y organización de código | 5  |
| Nicolas Bidenti | 9/11 | corrección de los archivos de test y creación de la planificación estructurada | 4 |
| Nicolas Bidenti, Martín Pereira | 11/11 | codificación clase planificación estructurada y funcionalidad para la misma | 3 |
| Nicolas Bidenti, Martín Pereira | 13/11 | reestructuración de la página y visualización de bloques | 4.5 |
| Nicolas Bidenti, Martín Pereira | 15/11 | codificacion de más tests y cambios en visualización de la página | 3 |
| Nicolas Bidenti | 16/11 | verificaciones para evitar errores, búsqueda de planificaciones  | 3.5 horas |
| Nicolas Bidenti, Martín Pereira | 17/11 | correccion de bugs al crear bloques estructurados y buscar planificaciones | 4 horas |
| Nicolas Bidenti | 18/11 | se soluciono un bug al buscar planificaciones, se modificó un menú, se movió la verificación de los forms | 3.5 |
| Nicolas Bidenti | 19/11 | cambio de tests, introducción de calendario semanal | 4 |
| Nicolas Bidenti, Nicolas Machin | 20/11 | reestructuración de main.js, pasando a usar varios archivos | 4 |
| Nicolas Bidenti | 21/11 | Se pasaron las funciones de búsqueda de planificaciones a un nuevo archivo, se hizo responsive el calendario semanal | 2 |
| Nicolas Machin | 22/11 | se arregló un bug en planificación diaria, se utilizó wave para hacer la pagina mas accesible | 1 |
| Nicolas Machin | 23/11 | se utilizó wave para hacer la pagina mas accesible | 2 | 
| Nicolas Bidenti, Martín Pereira | 23/11 | se arreglaron los test, se agrego mas informacion a la pagina al seleccionar un curso | 3 |
| Nicolas Bidenti | 24/11 | se agrego función en bloque semanal, se arregló un bug en bloque estructurado, se agregaron botones para wave | 4 |
 |  Nicolas Bidenti, Martín Pereira | 25/11 | informe2.md | 3 |
|  Nicolas Bidenti, Martín Pereira, Nicolas Machin | 27/11 | informe2.md, informe_testing.md  | 5 |

 
### Técnicas aplicadas y aprendizajes

- Uso de bibliotecas y herramientas: Se emplearon Bootstrap, jQuery y Moment.js para agilizar el desarrollo y garantizar estándares modernos.

- Modularidad: La separación en carpetas como domain e interface permitió un código organizado, escalable y fácil de mantener.

- Estándares ANEP: La funcionalidad se alineó con los requisitos oficiales, adaptando los campos y criterios a las pautas educativas.

- Accesibilidad y usabilidad: Diseño centrado en maestras, cumpliendo principios de WCAG y asegurando un acceso fluido desde móviles y escritorios.

- Control de versiones: Uso de la rama entregable_2 para mantener la estabilidad del proyecto mientras se desarrollaban nuevas características.

- Análisis estático y validaciones: Herramientas como Prettier, ESLint y Wave garantizaron calidad y accesibilidad en el código.

- Pruebas unitarias: Tests automatizados con Jest lograron un 100% de cobertura en los módulos del dominio.

- Responsividad: Diseño adaptativo que asegura funcionalidad en diferentes dispositivos y resoluciones.

Aprendizajes clave: Mejor organización del proyecto, integración de estándares y herramientas, y adopción de prácticas que mejoran la calidad y accesibilidad del software
