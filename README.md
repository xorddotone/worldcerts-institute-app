

<h1 align="center" style="border-bottom: none !important; margin-bottom: 5px !important;"><a href="https://worldcerts.herokuapp.com">WorldCerts</a></h1>


<p align="center">

</p>


<br />

> ✨ Worldcerts is the online digital certification issue platform. It provides verification using blockchain technology
<br />

### Quick Start

* Install dependencies by running `npm install`.
* Run `npm start` to start the local development server.
* 😎 **That's it!** You're ready to start building.

<br />

### Project Structure

- **Redux** is used for state management and all Redux specific files are located inside `src/redux`. Transitioning to a more robust solution such as Redux is also fairly simple.
- All primary templates are located inside `src/views`.
- There are layout defined inside `src/layouts`, however, the current structure provides an easy way of extending the UI kit. 
- The `src/components` directory hosts all template-specific subcomponents in their own subdirectory.
- All the styling files are located in `src/css`.
- Other extra styles specific to the libraries used are located inside `src/assets`.
<br />

## Folder Structure


```

my-app
├── build
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── assets
│   │   └──images
│   │      
│   ├── components
│   │   │    
│   │   └── component-name
│   │        ├── other-components-name.js 
│   │        └── index.js
│   ├── redux
│   │   │    
│   │   └── Actions-Files
│   │   │    
│   │   └── Reducers-Files
│   ├── Constants
│   │   │    
│   │   └── API-ROUTES
│   │   │    
│   │   └── Response-codes
│   │   │    
│   │   └── strings-constants
│   ├── utils
│   ├── css
│   │   │    
│   │   └── custome-styling
│   │   │    
│   │   └── shards-builtin-styling-file
│   │        
│   ├── index.js
│   └── service-worker.js
├── .gitignore
├── package.json
└── README.md

### Available Scripts

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.


<br />



<br />

### Built using

- [Shards React](https://github.com/designrevision/shards-react)
- [Redux]()
- [React DnD](https://react-dnd.github.io/react-dnd/about)

<br />

