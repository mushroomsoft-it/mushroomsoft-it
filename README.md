# MushroomSoft IT Site

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Installing dependencies
This project uses [pnpm](https://pnpm.io/) as the package manager. Install it if you don't have it:
```bash

## WordPress and Docker Setup

To run this project, follow these steps:

1. Run the `docker-compose` file located in the root directory of the project to start the WordPress environment.
   ```bash
   docker-compose up
   ```

2. After the environment is up, install the following plugins in WordPress:
   - **[Advanced Custom Fields (ACF)](https://www.advancedcustomfields.com/)**: Use this plugin to create custom fields for each `miembro`, such as:
     - Name
     - Career
     - Role
     - Expert In
     - Hobby
     - Photo
   - **Enable CORS**

3. Obtain the WordPress access token to interact with the APIs for media and data. You can check the routes using the Enable CORS plugin.
   - Media API URL: `http://localhost:8080/wp-json/wp/v2/media/`
   - Member API URL: `http://localhost:8080/wp-json/wp/v2/miembro/`

4. Add the access token to the `environment.ts` file of the Angular application.
   
   Example:
   ```typescript
   export const environment = {
       production: false,
       wordpress: {
           mediaApiUrl: 'http://localhost:8080/wp-json/wp/v2/media/',
           memberApiUrl: 'http://localhost:8080/wp-json/wp/v2/miembro/',
           accessToken: 'your-access-token-here'
       }
   };
   ```
