# GomoEvent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

This project requires Nodejs version 10.9.0 or later
- Check your version with: node -v in a terminal or console window
- Get node from [nodejs](https://nodejs.org)

## Running the app

Download the source from github via your preferred method

Insure you have the proper version of Angular CLI up and running
- run `npm install -g @angular/cli`

Navigate to the location of the parent folder of the app (ie: gomo-event)

Install dependencies:
- run `npm install` to install all dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Unit testing is not included. Upon completion of the product, I realized it would take a bit of work to get Karma up and running due to some depency issues, requring me to put more time in the project. Instead, here are things that would be tested:
x-api.service
- test `getAllEvents` using mocked data using two different values for optionsUrl
 - this should verify that the response only returns an object with actor, verb, and object data

toolbar.component
- test values of loggedIn after page loads
- test values of variables called within logout when logout is called to insure everything is reset

app.component
- for `ngOnInit`, the subscription call is tested in the service. Only the `this.events` content will need to be tested with mocked data
- `filteredActor`, `filteredVerb`, `filteredObject`, `getDefaultId` will be tested seperately from `ngOniInit`. They'll be passed an expected array and be tested for the expected return value
- `getMore` is also tested in the service, but again the `this.events` will need to be tested with mocked data

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
