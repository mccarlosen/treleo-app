import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('projects', 'ProjectsController.index')
  Route.post('projects', 'ProjectsController.store')
  Route.get('projects/:id', 'ProjectsController.show')
  Route.get('projects/:id/edit', 'ProjectsController.edit')
  Route.put('projects/:id', 'ProjectsController.update')
  Route.delete('projects/:id', 'ProjectsController.destroy')
})
  .prefix('api')
  .middleware(['auth:api'])
