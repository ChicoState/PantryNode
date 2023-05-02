# PantryNode's Frontend!

This is the React front-end for PantryNode.

## Development

### Prerequisites

Install all dependencies.

```shell
npm install
```

That's all!

### Run

```shell
npm start
```

### Validate

Run the tests.

```shell
npm test
```

Run the linter.

```shell
npm run lint
```
### Build for production   
```shell 
npm build
```
This will build the react application for production then host the build folder on ec2, GCP, Heroku etc.  

### Pages 

Public Pages
path: /login page: login page  <br>
path: /signup page: signup (register) page <br>
path: /verify page: verify email page <br>
path: /newpassword page: create new password page <br>
path: /forgetpassword page: forgot password page  <br>

Producted Pages
path: /stock page: current stock <br>
path: /summary path: summary page <br>
path: /donors path: donors page  <br>
path: /sale path: sale (checkout) page  <br>
path: /expiry path: items expiry page <br>
path: /scanner path: scanner page <br>

### Dependencies 
The frontend is styled using Material UI [Visit MaterialUI](https://github.com/mui/material-ui) <br>
The frontend is leveraging Redux for global state management [Visit Redux](https://react-redux.js.org) <br>
The frontend is using Axios as a promise-based HTTP library to handle interaction with the backend API. [Visit Axios](https://axios-http.com) <br>
The frontend is using Json Web Token for Authentication. [Visit JWT](https://jwt.io) <br>
We are using Quagga for barcode scanning. [Visit Quagga Site](https://serratus.github.io/quaggaJS/) <br>
We are using Recharts to vizualize charts. [Visit Recharts Github](https://github.com/recharts/recharts) <br>
We are using Formik to build our web based forms.  [Visit Formik Offical SIte](https://formik.org) <br>
The frontend is using eslint for linting and CI and CD. [Visit Eslint](https://eslint.org) <br>


