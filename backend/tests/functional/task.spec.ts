/* eslint-disable max-len */
import { test } from '@japa/runner'
import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Group name', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})

test('create new task', async ({client, route}) => {
  const user = await User.find(1)
  const project = await Project.find(2)
  const projectId = project?.id || 2
  const response = await client
    .post(route('TasksController.store', {project_id: projectId}))
    .field('project_id', projectId)
    .field('title', 'Desarrollo de Funcionalidad de Usuario')
    .field('description', 'Implementar una nueva funcionalidad de usuario para mejorar la experiencia en la plataforma, incluyendo la interfaz y la lógica subyacente.')
    .guard('api')
    .loginAs(user)

  response.assertStatus(201)
  response.assertBodyContains({
    response: 'success',
    data: {
      project_id: projectId,
      title: 'Desarrollo de Funcionalidad de Usuario',
    }})
})

test('get all tasks', async ({ client, route, assert }) => {
  const count = (await Task.query().where('project_id', 2)).length
  const user = await User.find(1)
  const response = await client
    .get(route('TasksController.index', {project_id: 2}))
    .guard('api')
    .loginAs(user)
  const data = response.body().data
  response.assertStatus(200)
  assert.equal(count, data.length)
})

test('update task', async ({ client, route, assert }) => {
  const task = await Task.find(4)  
  const user = await User.find(1)
  const currentTitle = task?.title
  const response = await client
    .put(route('TasksController.update', {project_id: 2, id: task?.id}))
    .field('id', task?.id || 1)
    .field('project_id', 2)
    .field('title', 'Plataforma de Crowdfunding para Arte [Updated]')
    .field('description', 'Creación de un sitio web que conecta a artistas emergentes con inversores, permitiendo financiar proyectos artísticos a través de la comunidad.')
    .guard('api')
    .loginAs(user)

  const data = response.body().data
  response.assertStatus(200)
  response.assertBodyContains({
    data: {
      title: 'Plataforma de Crowdfunding para Arte [Updated]',
    },
  })
  assert.notEqual(currentTitle, data.title)
})

test('show task', async ({ client, route }) => {
  const project = await Project.find(2)
  const task = await Task.find(4)
  const user = await User.find(1)
  const response = await client
    .get(route('TasksController.show', {project_id: project?.id, id: 4}))
    .guard('api')
    .loginAs(user)

  response.assertStatus(200)
  response.assertBodyContains({data: {
    project_id: project?.id,
    title: task?.title,
  }})
})

test('destroy task', async ({ client, route, assert }) => {
  const project = await Project.find(2)  
  const user = await User.find(1)
  const response = await client
    .delete(route('TasksController.destroy', {project_id: project?.id, id: 4}))
    .guard('api')
    .loginAs(user)

  const task = await Task.find(4)
  response.assertStatus(200)
  response.assertBodyContains({ response: 'success' })
  assert.isNull(task)
})
