# Example Project
This is an example Node.js project that uses Docker and Docker Compose for development and deployment. The project includes a basic setup for running a Node.js application with automatic restarts on file changes using `nodemon`.
## Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
## Getting Started
### Clone the Repository
```sh
git clone https://github.com/your-username/example.git
cd example
```
## Running the Application
### Using Docker Compose
To start the application using Docker Compose, run:
```sh
npm run docker-dev
```
To test the application using Docker Compose, run:
```sh
npm run docker-test
```
This command will build the Docker image, create the container, and start the services defined in the docker-compose.yml and docker-compose.dev.yml files.
Important: If you install the dependencies, you may need to delete them to run with docker.
### Without Docker
To run the application without Docker, you can use the following command:
```sh
npm i
npm run dev
```
### Endpoints
##### Add Product
Endpoint: POST /api/products
Description: This endpoint allows you to add a new product to the system.
```javascript
{
  "name": "Product Name",
  "stock": 50
}
```
Response:
201 Created: If the product is successfully created.
400 Bad Request: If there are validation errors in the request bod

Example:
```javascript
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Product Name", "price": 100.0, "stock": 50}'
```

##### Add Product to Order
Endpoint: POST /orders/:id/products/:productId
Description: This endpoint allows you to add a product to an existing order.
Request Parameters:
- id: The ID of the order.
-productId: The ID of the product to be added.
```javascript
{
  "quantity": 2
}
```
Response:
- 201 Created: If the product is successfully added to the order.
- 400 Bad Request: If there are validation errors in the request body.
- 404 Not Found: If the order or product does not exist.
Example:
```javascript
curl -X POST http://localhost:3000/orders/1/products/2 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```
##### Relevant Code
The OrderController class in orderController.ts handles the logic for adding products to an order.
The ProductService class in index.ts handles the logic for creating products.
The OrderService class in index.ts handles the logic for adding products to an order.
These endpoints allow you to manage products and orders effectively within the system.
### License
This project is licensed under the MIT License - see the LICENSE file for details.