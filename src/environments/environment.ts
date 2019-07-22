// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/",
  firebase: {
    apiKey: "AIzaSyDQUPYzmZ7o1y4rizijent-x1TRVv6BFwU",
    authDomain: "awilix-4d7b7.firebaseapp.com",
    databaseURL: "https://awilix-4d7b7.firebaseio.com",
    projectId: "awilix-4d7b7",
    storageBucket: "",
    messagingSenderId: "99538087008",
    appId: "1:99538087008:web:beff26b685a0dfc8"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
