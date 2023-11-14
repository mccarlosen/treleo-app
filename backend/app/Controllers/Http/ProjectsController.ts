/* eslint-disable no-mixed-spaces-and-tabs */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from 'App/Models/Project'
import CreateProjectValidator from 'App/Validators/CreateProjectValidator'
import UpdateProjectValidator from 'App/Validators/UpdateProjectValidator'

export default class ProjectsController {
  public async index ({ response }: HttpContextContract) {
    const projects = await Project.query().withCount('tasks') // query().paginate(15)
    response.json({ response: 'success', data: projects })
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(CreateProjectValidator)
      const project = await Project.create(data)
      if (!project.$isPersisted) {
        throw new Error('The project doesn\'t have been saved.')
      }
      response.status(201).json({response: 'success', data: project})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const { id } = params
      const project = await Project.query().where('id', id).withCount('tasks').preload('tasks').first()
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      response.json({response: 'success', data: project})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async edit ({ params, response }: HttpContextContract) {
    try {
      const { id } = params
      const project = await Project.find(id)
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      response.json({response: 'success', data: project})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async update ({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UpdateProjectValidator)
      const project = await Project.find(data.id)
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      await project.merge(data).save()
      if (!project.$isPersisted) {
        throw new Error('The project doesn\'t have been updated.')
      }
      response.json({response: 'success', data: await project.refresh()})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const { id } = params
      const project = await Project.find(id)
      if (!project) {
        return response.status(404).json({response: 'error', message: 'Project not found', data: {}})
      }
      await project.delete()
      response.json({response: 'success', data: {}})
    } catch (error) {
      response.status(422).json({response: 'error', message: error.message, data: error})
    }
  }
}
