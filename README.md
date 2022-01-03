# Houm for Cheff

## Everyone can be a chef!

This project is deployed at [https://houm.vercel.app/](https://houm.vercel.app/).

For testing and development purposes the following staging links are available
- [https://houm-juan.surge.sh/](https://houm-juan.surge.sh/)
- [https://houm-juan-dev.surge.sh/](https://houm-juan-dev.surge.sh/)

## Features
- Search and query cooking recipes.
- Add recipes to favorites list. The list remain persistent on the Local Storage.
- Debouncing for queries, this means when typing a recipe name the API won't be fired on each key up.
- Pseudo infinite pagination on trending page.
- Pagination on home page. While implementing the pagination I realized of a bug in the service. In the last pages the results does not correspond with the expected results.
- Responsive, mobile first.
- Handling errors on null/wrong images.
- Gitflow with main and develop branches with their corresponding staging links environments.
- CI/CD with Github Actions.

## Nice to have
Some features would be really nice but time was limited:
- Lazy loading for assets.
- More animation while showing recipes.
- A real newsletter form.
- Fav a recipe in the recipe page.
- Sanitization and cleaning of security risks such as html coming from the backend and reading local storage and parsing to JSON
- Have a full suite of tests.
- Add memoization/caching for server request to enhance UX and mitigate costs on the backend/services.


## Other stuff

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
