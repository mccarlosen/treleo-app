import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import CreateTaskValidator from 'App/Validators/CreateTaskValidator'
import UpdateTaskValidator from 'App/Validators/UpdateTaskValidator'

export default class TasksController {
  public async index ({ params, response }: HttpContextContract) {
    const project = await Project.find(params.project_id)
    if (!project) {
      return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
    }
    const tasks = await project.related('tasks').query()
    response.json({ response: 'success', data: tasks })
  }

  public async store ({ params, request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateTaskValidator)
      const project = await Project.find(params.project_id)
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      const task = await project.related('tasks').create(data)
      if (!task.$isPersisted) {
        throw new Error('The task doesn\'t have been saved.')
      }
      response.status(201).json({response: 'success', data: task})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const project = await Project.query().where('id', params.project_id).first()
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      const task = await project.related('tasks').query().where('id', params.id).first()
      if (!task) {
        return response.status(404).json({response: 'error', message: 'Task not found', data: {}})
      }
      response.json({response: 'success', data: task})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UpdateTaskValidator)
      const project = await Project.query().where('id', params.project_id).first()
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      const task = await project.related('tasks').query().where('id', params.id).first()
      if (!task) {
        return response.status(404).json({response: 'error', message: 'Task not found', data: {}})
      }
      await task.merge(data).save()
      if (!task.$isPersisted) {
        throw new Error('The task doesn\'t have been updated.')
      }
      response.json({response: 'success', data: await task.refresh()})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const project = await Project.query().where('id', params.project_id).first()
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      const task = await project.related('tasks').query().where('id', params.id).first()
      if (!task) {
        return response.status(404).json({response: 'error', message: 'Task not found', data: {}})
      }
      await task.delete()
      response.json({response: 'success', data: {}})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }
}
