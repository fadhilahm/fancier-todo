# todo-server

## **Register a New User**

Create a new user and save it in the database.

- **URL**

  /register

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `email=[string], must be a valid email and unique`

  `password=[string], must be more than 3 characters`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        "id": 5,
        "email": "fadhilah_gis@yahoo.co.id"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```javascript
    {
        "status": 400,
        "msg": [
            "Email already in use"
        ]
    }
    ```

  OR

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```javascript
    {
        "status": 400,
        "msg": [
            "Email must not be empty",
            "Email must be filled with a valid email",
            "Password must be filled",
            "Password must at least have 3 characters"
        ]
    }
    ```

## **Log In a User**

Log in a user and generate token if the process is successful.

- **URL**

  /login

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `email=[string]`

  `password=[string]`

- **Success Response:**

  - **Code:** 200<br>
    **Content:**
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWRoaWxhaG1ldHJhQGdtYWlsLmNvbSIsImlhdCI6MTU4MzgwNTI3OH0.C-rUhb8ytKun4svhTMmTIcFo5HMtgDL4kXA-o7VnAkQ"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST

    **Content:**

    ```javascript
    {
        "status": 400,
        "msg": "email / password was wrong"
    }
    ```

## **Log In through Google**

Log in a user using Google OAuth.

- **URL**

  /gsignin

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `token=[string], received from google OAutth`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWRoaWxhaG1ldHJhQGdtYWlsLmNvbSIsImlhdCI6MTU4MzgwNTQ2M30.1kTg6orF9GckdLglZ9VAoPtvGtvmfRElJ1LZ9P0KGP0"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    {
        "status": 500,
        "msg": "Internal Server Error"
    }
    ```

## **Get all Todos**

Get all Todos in the database

- **URL**

  /todos

- **Method:**

  `GET`

- **Headers Params**

  `token=[string], received after successful login`

- **Success Response:**

  - **Code:** 200<br>
    **Content:**

    ```javascript
    [
      {
        id: 28,
        title: "Slay Leviathans",
        description: "Buy new ammo for the super shotgun",
        status: false,
        due_date: "2020-03-11T00:00:00.000Z",
        photo:
          "https://media3.giphy.com/media/11wsZr0jbXc15m/giphy.gif?cid=078ac23c633e9a1b10924d21abb9674296a440cbbe25d1f5&rid=giphy.gif",
        UserId: 1,
        createdAt: "2020-03-10T01:39:56.517Z",
        updatedAt: "2020-03-10T01:39:56.517Z"
      },
      {
        id: 29,
        title: "Find Holy Grail",
        description: "Buy new ammo for the super shotgun",
        status: false,
        due_date: "2020-03-11T00:00:00.000Z",
        photo:
          "https://media3.giphy.com/media/2aIbkwx7SpiMApUYkE/giphy-downsized-large.gif?cid=078ac23ccc1f6eb2cd373722efa3f4c1c641870bcbebdcbc&rid=giphy-downsized-large.gif",
        UserId: 1,
        createdAt: "2020-03-10T01:41:38.419Z",
        updatedAt: "2020-03-10T01:41:38.419Z"
      }
    ];
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED<br>
    **Content:**

    ```javascript
    {
      "status": 401,
      "msg": "unauthorized, please log in first"
    }
    ```

## **Get a Todo by Id**

Return a Todo that matched with the Id. This can only be done by the user that created that Todo.

- **URL**

  /todos/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id, refers to the id of Todo`

- **Headers Params**

  `token=[string], received from successful login`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "data": {
            "id": 10,
            "title": "Play Card Games",
            "description": "Bring the exodia deck",
            "status": false,
            "due_date": "2020-03-11T00:00:00.000Z",
            "photo": "https://media2.giphy.com/media/sCubIL3LN80wg/giphy.gif?cid=078ac23ce98a38281c1bf149632a2657e9b7fcb4d823516a&rid=giphy.gif",
            "UserId": 1,
            "createdAt": "2020-03-09T17:04:29.721Z",
            "updatedAt": "2020-03-09T17:04:29.721Z"
        }
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```javascript
    {
        "error": {
            "status": 404,
            "msg": "error not found"
        }
    }
    ```

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```javascript
    {
        "status": 401,
        "msg": "Access prohibited, you can only access your own todos"
    }
    ```

## **Create a new Todo**

Create a new todo instance and save it in the database. It will also hit Giphy API in order to find the suitable picture for said Todo based only on its title. The value of UserId is determined from the token key in the header.

- **URL**

  /todos

- **Method:**

  `POST`

- **Headers Params**

  **Required:**

  `token=[string], received after successful login`

- **Data Params**

  **Required:**

  `title=[string]`

  `description=[string]`

  **Optional:**

  `status=[boolean], default value is false`

  `due_date=[date], must be later than now, default value is one day after today`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        "data": {
            "status": false,
            "due_date": "2020-03-11T00:00:00.000Z",
            "id": 34,
            "title": "Learn Node.js",
            "description": "Use codacademy for reference",
            "photo": "https://media1.giphy.com/media/8dYmJ6Buo3lYY/giphy.gif?cid=078ac23c64987fad900344707e52e67584a3d70ceda43122&rid=giphy.gif",
            "UserId": 1,
            "updatedAt": "2020-03-10T02:03:23.722Z",
            "createdAt": "2020-03-10T02:03:23.722Z"
        }
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```javascript
    {
        "status": 500,
        "msg": "Internal Server Error"
    }
    ```

## **Update a Todo by Id**

Edit an existing Todo and save it in the database. This can only be done by the user that created that Todo.

- **URL**

  /todos/:id

- **Method:**

  `PUT`

- **Headers Params**

  **Required:**

  `token=[string], received after successful login`

- **URL Params**

  **Required:**

  `id, refers to the id of the todo`

- **Data Params**

  **Required:**

  `title=[string], must not be empty`

  `description=[string], must not be empty`

  **Optional:**

  `status=[boolean], default value is false`

  `due_date=[date], must be later than now, default value is one day after today`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "data": [
            1,
            [
                {
                    "id": 5,
                    "title": "Cook Lunch",
                    "description": "There's a Spaghetti in the fridge",
                    "status": false,
                    "due_date": "2020-04-21T00:00:00.000Z",
                    "photo": "https://media3.giphy.com/media/aU5zsQfK6gfAI/giphy.gif?cid=078ac23cb5af56d20847fff76106a3a352b2719b5cd624bf&rid=giphy.gif",
                    "UserId": 1,
                    "createdAt": "2020-03-09T10:38:28.924Z",
                    "updatedAt": "2020-03-10T04:08:19.545Z"
                }
            ]
        ]
    }
    ```

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    ```javascript
    {
        "status": 401,
        "msg": "Access prohibited, you can only access your own todos"
    }
    ```

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```javascript
    {
        "status": 500,
        "msg": "Internal Server Error"
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```javascript
    {
        "status": 404,
        "msg": "error not found"
    }
    ```

## **Delete a Todo by Id**

Drop a Todo from the database based on Id. This can only be done by the user that created that Todo.

- **URL**

  /todos/:id

- **Method:**

  `DELETE`

- **Headers Params**

  **Required:**

  `token=[string], received after successful login`

- **URL Params**

  **Required:**

  `id, refers to the id of the Todo`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "msg": "Successfully deleted a Todo"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```javascript
    {
        "status": 404,
        "msg": "error not found"
    }
    ```

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    ```javascript
    {
        "status": 401,
        "msg": "Access prohibited, you can only access your own todos"
    }
    ```
