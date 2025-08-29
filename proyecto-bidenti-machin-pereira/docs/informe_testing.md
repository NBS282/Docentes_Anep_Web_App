# Informe de testing

Proyecto asignado: https://github.com/IngSoft-FIS-2024-2/proyecto-m4c-fabrica-kirzner-mazza

## Test de sistema

### Diseño de casos de prueba

- Análisis y técnica utilizada:

Los casos de prueba fueron diseñados aplicando particiones de equivalencia y análisis de valores límite (caja negra):

- Particiones de equivalencia:

  - Dividimos las entradas en clases válidas e inválidas según los requerimientos funcionales.
  
  - Cada clase se probó al menos una vez.


|Entrada/Variable | Clases válidas | Clases inválidas  |
|-----------------|----------------|--------------------------------------------------------------------|
|Título           |Título único(1)    |Titulo existente, titulo vacio(10)|
|Grado            |De primero a sexto(2)|Fuera de ese rango(11)|
|Grupo            |Cualquiera no vacia(3)      |Campo vacio(12)|
|Fecha De Planificación |Fecha válida(4) | Fecha vacía(13)|
|Espacio          |Científico-Matemítico, Comunicación, Ciencias Sociales y Humanidades, Creativo-Artístico, Desarollo Personal y Conciencia Corporal, Técnico-Tecnológico(5) | Seleccione un espacio(14) |
|Contenido        |Matemática, Física-Quimica, Biología, Geología y Astronomía, Lengua española, Segundas lenguas y lenguas extranjeras, Historia, Formación para la ciudadanía, Geografía, Artes Visuales y Plásticas, Música, Literatura, Teatro, Danza, Conciencia y conocimiento corporal, Educación fisica, Ciencias de la computación, Tecnologia Educativa(6)|Seleccione un espacio primero, seleccione un contenido(15) |
|Competencia      |Cualquiera(7)                |Ninguna(16)                                                                |
|Privacidad       |Pública, Privada(8)|Cualquiera salvo las validas(17)                                                                    | 
|Descripción      |Cualquiera(9)           |Ninguna(18)       


|Caso de prueba |Título |Grado |Grupo | Fecha de Planificación |Espacio  |Contenido |Competencia|Privacidad |Descripción |Resultado Esperado |Clases de equivalencia cubiertas |
|---------------|-------|------|------|------------------------|---------|----------|-----------|-----------|------------|--------------------|---------------------------------|
|CP 1 |Prueba |1° |A |01/05/2024 |Comunicación |Lengua Española | (vacío) |Publica | (vacío) | Prueba agregada correctamente! |1,2,3,4,5,6,7,8,9|
|CP 2 |Prueba |1° |A |04/07/2024 |Seleccione un espacio | Matemática | test | Privada | test | Ya existe una planificación con el título "Prueba" |2,3,4,6,7,9,10,14,17|
|CP 3 |Clase 5 |9° |D |06/07/2024 |Científico-Matemítico | Física-Quimica | Ejercicio Química | Privada | Aprendiendo de la tabla periódica |Grado inválido |1,3,4,5,6,7,8,9,11|
|CP 4 |(vacío) |3° |(vacío) |(vacío) |Desarollo Personal y Conciencia Corporal | Seleccione un espacio primero | nada | Pública | Reflexión del último trabajo visto en clase | Complete el campo "Titulo" |2,5,7,8,9,10,12,13,15|                                                      

### Definición de ambientes de testing y ejecución de casos

Ambiente de desarrollo (codigo):
  
   - Propósito: Validar mediante herramientas y estandares de codigo la calidad del mismo. 
   
   - Configuración:
    
     - Sistema operativo: Windows 10.
    
     - Navegador: Google Chrome (v.118).
   
     - Resolución de pantalla: 1920x1080.
  
   - Herramientas utilizadas:
    
     - Prettier y ESLint para garantizar estándares de codificación.
    
     - Consola del navegador para pruebas rápidas.

Ambiente de pruebas:

   - Propósito: Realizar pruebas funcionales y de aceptación por parte del equipo de QA.
   
   - Configuración:
    
     - Sistemas operativos: Windows 10 y Android.
    
     - Navegadores: Google Chrome, Firefox y Safari.
   
     - Resoluciones de pantalla: desde 1366x768 (laptop) hasta adaptaciones móviles.
  
   - Características:
     - Datos de prueba configurados específicamente para validar cada caso.
    
     - Replicación de configuraciones similares a las que utilizarán los usuarios finales.
     -  Consola  del navegador para depuracion    
     - Wave utilizada para evaluar la accesibilidad de la página web de forma automatica y rapida.

Ejecución:

- Casos de prueba ejecutados y documentados según su estado: Pasa, Falla o Bloqueado.

- Pruebas agrupadas por funcionalidades específicas: ingreso de datos, validaciones de interfaz y generación de reportes.

- Revisión iterativa para resolver defectos antes de pasar a producción.

### Sesiones de pruebas exploratorias

- Sesion 1:

    - Fecha: 27/11/2024.
    - Duración: 90 minutos.
    - Misión: prueba general del sistema, verificando su funcionamiento debido para el usuario promedio
    - Navegador web: Firefox y Chrome
    - Sistemas Operativos: windows 10 y 11 

    - Notas tomadas:
        - la pagina funciona adecuadamente en resoluciones de dispositivos moviles
        - no existen planificaciones semanales
        - las planificaciones tienen un unico espacio y unidad curricular
        - los botones para seleccionar "Publica" o "Privada" necesitan mas padding entre si
        - una alineacion derecha en los items de "grado" seria mas adecuada
        - uso indebido de alerts
        - se menciona que se pueden compartir las planificaciones, pero esto no es posible
        - la privacidad de una planificacion actualmente no tiene uso
        - wave dio dos alertas, pero estas no fueron tomadas en cuenta

- Resultados:

    - Defectos encontrados: 

        - Falta de validación en campos de texto (tanto limite inferior como superior)
        - nombramiento indebido de varios campos
        - es posible inyectar codigo en los campos, pero no se tomo en cuenta pues no fue un tema discutido en clase
        - error al eliminar planificaciones tras seleccionar "No volver a preguntar"
        - no se puede cancelar la edicion de una planificacion

    - Cobertura:

        - crear planificaciones
        - editar planificaciones
        - eliminar planificaciones
        - verificacion de que sea web responsive
        - pruebas de accesibilidad con wave

## Reporte de Issues

### Buenas prácticas de reporte

Las buenas practicas que aplicamos a la hora de hacer reportes fueron con el fin de garantizar un reporte efectivo y utilizable de los issues encontrados con el fin de que el equipo al que le hicimos el testing pueda sacar valor de ellos.

Algunas buenas practicas que utilizamos fueron:

- Incluir pasos de ejecucion para reproducir el problema encontrado.

- Hacer un resumen del error como titulo del cuerpo del reporte resaltando su impacto en el usuario o el sistema.

- Adjuntar archivos (imágenes y videos) para facilitar la comprensión del problema.
- Comparar el resultado esperado y el obtenido, destacando la diferencia entre los mismos.

- Clasificar la severidad (baja, media, alta, bloqueante) y la prioridad (media, baja, alta) del issue para determinar el orden en que debe resolverse.

- Proporcionar información del entorno de ejecución, incluyendo:
  
  - Sistema operativo (ej: Windows 10, Android).

  - Navegador (ej: Google Chrome, Firefox).

  - Resolución de pantalla (ej: 1920x1080).

### Clasificación de Issues

Para organizar los problemas identificados, se han clasificado en las siguientes categorías:

- Inconsistencia: Errores derivados de una falta de cumplimiento de las especificaciones iniciales.

- Gramática / Ortografía: Errores de escritura, mal uso de nombres en campos o etiquetas.

- Usabilidad: Problemas que no bloquean el uso del sistema, pero afectan la experiencia del usuario.

- Mejora: Cambios sugeridos para optimizar el sistema sin que sean estrictamente necesarios.

- Error: Fallos críticos en la interfaz o el código que causan disrupciones significativas en el uso.


## Informe de calidad del sistema

### Resumen de Issues por Tipo y Severidad

El sistema presenta inconsistencias críticas y errores graves relacionados con el entendimiento de los requisitos, que afectan directamente su funcionalidad básica, como la imposibilidad de crear planificaciones semanales o eliminar planificaciones bajo ciertas condiciones. Aunque se detectaron problemas menores de gramática y usabilidad, como etiquetas incorrectas y la falta de elementos de navegación claros, estos no bloquean el uso del sistema, pero sí impactan en la experiencia del usuario. Las mejoras sugeridas, como ajustes en la interfaz y optimización de funcionalidades, refuerzan que, pese a estos problemas, la estructura general es sólida, y el código está bien organizado, lo que permite una base confiable para corregir y extender el sistema.

- Resumen de los Issues:

| ID   | Tipo               | Severidad     | Descripción                                                                                   |
|------|--------------------|---------------|-----------------------------------------------------------------------------------------------|
| #1   | Inconsistencia     | Alta          | Una planificación debe poder tener más de un espacio curricular.                              |
| #2   | Gramática / Ortografía | Baja          | Nombres incorrectos en las Unidades Curriculares.                                             |
| #3   | Inconsistencia     | Alta          | No se pueden crear planificaciones semanales.                                                 |
| #4   | Gramática / Ortografía | Baja          | Etiquetas incorrectas en los Espacios Curriculares.                                           |
| #5   | Usabilidad         | Media         | Uso de alerts disruptivos en lugar de modales.                                              |
| #6   | Mejora             | Baja          | La alineación de las opciones del selector de grados puede ser optimizada.                    |
| #7   | Inconsistencia     | Media         | La guía indica que se pueden compartir planificaciones, pero esta función no está implementada.|
| #8   | Usabilidad         | Media         | Planificaciones pueden guardarse con "Competencia" y "Descripción" vacías.                    |
| #9   | Error              | Alta          | Algunos campos no tienen límites de caracteres, causando errores en la interfaz.              |
| #10  | Mejora             | Baja          | Mejorar la eficiencia al crear planificaciones.                                               |
| #11  | Error              | Bloqueante    | Al seleccionar "No permitir que vuelva a preguntar", ya no se pueden eliminar planificaciones.|
| #12  | Mejora             | Baja          | Incrementar la separación entre los botones de privacidad ("Pública" y "Privada").            |
| #14  | Usabilidad         | Media         | No se puede cancelar una modificación de planificación, lo cual limita al usuario.            |

### Evaluación Global de Calidad

Se detectaron un total de 13 issues, clasificados según su severidad:
- Alta 3 issues (23%).
- Media 4 issues (31%).
- Baja 5 issues (38%).
- Bloqueante 1 issue (8%).

En términos de tipos:
- Inconsistencias 3.
- Gramática / Ortografía 2.
- Usabilidad 3.
- Errores 2.
- Mejoras 3.


Observaciones generales:

- Problemas críticos:

   - Se identificaron fallas de inconsistencias y errores derivados de una interpretación incorrecta de los requisitos del problema, los cuales consideramos los más graves. Estas fallas afectan directamente la funcionalidad esperada del sistema, haciendo que no cumpla con las especificaciones clave.

- Aspectos positivos

   - La estructura del sistema es correcta y sencilla de usar. La interfaz es intuitiva en la mayoría de los casos, lo que facilitará su adopción por los usuarios.

   - El código está bien organizado y estructurado, lo que facilita su mantenimiento y futuras modificaciones.

- Áreas de mejora

   - Funcionalidades no claras Algunas opciones, como "Privada / Pública", no tienen un impacto evidente en el sistema, lo que genera confusión.

   - Navegabilidad Faltan elementos de navegación, como flechas para volver atrás, en algunos flujos, lo que podría frustrar a los usuarios.

   - Experiencia del usuario: Mejorar la coherencia visual (ej, separación entre botones) y funcionalidad (ej, permitir cancelar ediciones) incrementaría la calidad general del sistema.


## Reflexión

### Detalle del trabajo individual

| Alumno          | Fecha        | Actividad                                                                                                                          | Cantidad de horas |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Nicolas Bidenti, Nicolas Machin, Martín Pereira | 27/11 | testing de la pagina web | 2 |
| Nicolas Bidenti, Nicolas Machin, Martín Pereira | 27/11 | realizacion del informe de testing | 1.5 |
| Nicolas Bidenti, Nicolas Machin, Martín Pereira | 28/11 | realizacion del informe de testing | 2.5 |


### Técnicas aplicadas y aprendizajes

- Se emplearon buenas prácticas en la documentación de problemas, incluyendo pasos detallados para reproducir los errores, comparación entre resultados esperados y obtenidos, clasificación por severidad y prioridad, y evidencia visual (imágenes/videos).
- Este enfoque permitió identificar de manera organizada inconsistencias y errores graves en el sistema, además de proporcionar un canal claro para la corrección.

- Se utilizó la técnica de caja negra para diseñar los casos de prueba basados en particiones de equivalencia y análisis de valores límite, enfocándose en validar la funcionalidad del sistema desde la perspectiva del usuario.
- Se logró cubrir un amplio rango de entradas, incluyendo valores válidos e inválidos, asegurando una adecuada evaluación de los flujos principales y excepcionales.

- Se realizaron sesiones de testing exploratorio para identificar problemas no cubiertos por los casos de prueba predefinidos, enfocándose en la experiencia del usuario, navegabilidad y consistencia visual.
- Este enfoque permitió detectar áreas de mejora en la interfaz y funcionalidades no documentadas, como el comportamiento de las opciones "Pública/Privada".

- Se utilizaron herramientas automáticas como Wave para evaluar elementos de accesibilidad en la interfaz web, identificando áreas de oportunidad en contraste visual, etiquetas y navegación por teclado.

- La importancia de comprender a fondo los requisitos iniciales del sistema, ya que los errores más críticos surgieron de inconsistencias o malentendidos en la definición de las funcionalidades.
- El valor de combinar pruebas estructuradas (casos de prueba) con enfoques dinámicos (pruebas exploratorias) para obtener una cobertura más completa.
- La necesidad de documentar de manera exhaustiva cada hallazgo y asegurar trazabilidad para facilitar las correcciones.

En resumen, este proceso fortaleció la capacidad del equipo para planificar, ejecutar y documentar pruebas de calidad, garantizando que los problemas identificados sean claros y accionables.
