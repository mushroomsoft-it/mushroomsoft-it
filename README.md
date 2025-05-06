# MushroomSoft IT Site

Este proyecto es una aplicación web desarrollada con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.4., diseñada para presentar información institucional de MushroomSoft, incluyendo automatizaciones con Power Automate y un chatbot interactivo.

## Servidor de desarrollo

Ejecuta `ng serve -o` para iniciar el servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## Compilación

Ejecuta `ng build` para compilar el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`.

## Pruebas unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias mediante [Karma](https://karma-runner.github.io).

## Pruebas end-to-end

Ejecuta `ng e2e` para ejecutar las pruebas end-to-end usando una plataforma de tu elección. Para usar este comando, primero necesitas agregar un paquete que implemente capacidades de pruebas end-to-end.

## Ayuda adicional

Para obtener más ayuda sobre Angular CLI, ejecuta:

```bash
ng help
```

O visita la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).

## Instalación de dependencias

Este proyecto utiliza [pnpm](https://pnpm.io/) como gestor de paquetes. Instálalo si aún no lo tienes:

```bash
npm install -g pnpm
```

---

## Power Automate

Este proyecto cuenta con una solución de **Power Automate** integrado, que automatiza la lista de empleados de MushroomSoft en la Sección **'Nuestro equipo'**. La solución llamada **"MushroomSoft Employees"** cuenta con tres flujos hechos en **Power Automate**, mismos que tienen las siguientes características:

1. Fetch MushroomSoft Employees Data (trigger): obtiene y procesa la lista de empleados en Sharepoint cada vez que se lo llama.
2. MushroomSoft Employees - Create & Update - GitHub Action API Request (trigger): cada vez que este flujo detecte una creación o actualización de un elemento de la lista de empleados en Sharepoint, este hará una llamada a un GitHub Action que permita ejecutar el flujo número uno y actualice la lista de empleados de la organización.
3. MushroomSoft Employees - Deleted - GitHub Action API Request (trigger): cada vez que este flujo detecte que un elemento de la lista de empleados en Sharepoint ha sido eliminado, este hará una llamada a un GitHub Action que permita ejecutar el flujo número uno y actualice la lista de empleados de la organización.

Procesamiento de información:
El procesamiento de información para la página web se lo hace en los archivos que se encuentran en 'scripts'.

Esta solución tiene dos stages en Power Platform:

1. MushroomSoft's Business Unit Development Environment: para desarrollo y pruebas.
2. MushroomSoft's Shared Production Environment: para producción.

CI/CD:

- Pipeline: **MushroomSoft's Pipeline**
- Gestión del ciclo de vida con Git y GitHub Actions.

Algunas notas extras:

- El acceso a esta solución es restringido y limitado: contacte con el departamento de IT de MushroomSoft y solicite los accesos correspondientes para la edición y publicación en producción de los flujos.
- La solución trabaja con Sharepoint. Contacte con el departamento de IT de MushroomSoft y solicite la información correspondiente para su acceso a las listas de desarrollo y producción.
- La solución para su implementación en producción requiere de variables de entorno.

## Chatbot

La aplicación incluye un **chatbot** interactivo para brindar información a los usuarios realizado en Copilot Studio. A continuación se brindan algunas características de esta solución y sus elementos:

1. Está disponible en la esquina inferior derecha (en móviles en la parte inferior central).
2. El proyecto de esta aplicación se encuentra en Power Platform, con el nombre **MushroomSoft's External Agent**
3. El agente/chatbot se llama **MushroomSoft's External Agent**

Esta solución tiene dos stages en Power Platform:

1. MushroomSoft's Business Unit Development Environment: desarrollo y pruebas.
2. MushroomSoft's Shared Production Environment: producción.

CI/CD:

- Pipeline: **MushroomSoft's Pipeline**
- Gestión del ciclo de vida con Git y GitHub Actions.

Algunas notas extras:

- El acceso a esta solución es restringido y limitado: contacte con el departamento TI de MushroomSoft y solicite los accesos correspondientes para la edición y publicación en producción de los flujos.

## Entornos

El proyecto cuenta con los siguientes entornos:

- **Desarrollo local**  
  URL: `http://localhost:4200/`  
  Utilizado para desarrollo activo, pruebas y validaciones.

- **QA**  
  URL: `https://msoftpublicsite.z13.web.core.windows.net/`  
  Utilizado para pruebas y validaciones.

- **Producción**  
  URL: `https://mushroomsoft-it.com/#/home`  
  Versión estable del sitio disponible para los usuarios finales. Requiere revisión y aprobación para despliegues.mushr
