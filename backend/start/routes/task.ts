import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('projects/:project_id/tasks', 'TasksController.store')
  Route.get('projects/:project_id/tasks', 'TasksController.index')
  Route.get('projects/:project_id/tasks/:id', 'TasksController.show')
  Route.put('projects/:project_id/tasks/:id', 'TasksController.update')
  Route.delete('projects/:project_id/tasks/:id', 'TasksController.destroy')
})
  .prefix('api')
  .middleware(['auth:api'])
