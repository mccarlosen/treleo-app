/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import './routes/project'
import './routes/task'

Route.get('/', ({ response }) => {
  response.send('Welcome to Treleo API')
})
Route.post('/api/auth/login', 'AuthController.login')
Route.group(() => {
  Route.post('/logout', 'AuthController.logout')
  Route.get('/user', 'AuthController.getUser')
})
  .prefix('api/auth')
  .middleware('auth:api')

// test create user
Route.post('/api/user/create', 'UsersController.create')
