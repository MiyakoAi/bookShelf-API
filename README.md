# BookShelf-API by Dicoding

- Structure Files
```
.
└── BookShelf_API
    ├── node_modules
    ├── src
    │   ├── Books
    │   │   └── books.js
    │   ├── controllers
    │   │   └── handler.js
    │   ├── routes
    │   │   └── routes.js
    │   ├── test
    │   │   ├── Bookshelf API Test.postman_collection.json
    │   │   └── Bookshelf API Test.postman_environment.json
    │   └── server.js
    ├── .env
    ├── eslint.config.js
    ├── package-lock.json
    └── package.json
 ```

- Installing packages :
  - Create package.json <br>
  `npm init --y`
  - Install nodemon <br>
  `npm install nodemon --save-dev`
  - Install framework Hapi <br>
  `npm install @hapi/hapi`
  - Install nanoid for ID <br>
  ` npm install nanoid`
  - Install dotenv for env file <br>
  `npm install dotenv`
  - Install ESlint (optional) <br>
  `npm init @eslint/config@latest`
	
- Running <br>
`npm run start`

- Testing Postman <br>
use `localhost:9000/books`
