/* eslint-disable max-len */
import { test } from '@japa/runner'
import Project from 'App/Models/Project'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Group name', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
})

test('create new project', async ({client, route}) => {
  const user = await User.find(1)
  const response = await client
    .post(route('ProjectsController.store'))
    .field('title', 'Plataforma de Crowdfunding para Arte')
    .field('description', 'Creación de un sitio web que conecta a artistas emergentes con inversores, permitiendo financiar proyectos artísticos a través de la comunidad.')
    .guard('api')
    .loginAs(user)

  response.assertStatus(201)
  response.assertBodyContains({ data: {
    title: 'Plataforma de Crowdfunding para Arte',
    description: 'Creación de un sitio web que conecta a artistas emergentes con inversores, permitiendo financiar proyectos artísticos a través de la comunidad.',
  }})
})

test('update project', async ({ client, route, assert }) => {
  const user = await User.find(1)
  const response = await client
    .put(route('ProjectsController.update', {'id': 1}))
    .field('id', 1)
    .field('title', 'Plataforma de Crowdfunding para Arte [Updated]')
    .field('description', 'Creación de un sitio web que conecta a artistas emergentes con inversores, permitiendo financiar proyectos artísticos a través de la comunidad.')
    .guard('api')
    .loginAs(user)

  response.assertStatus(200)
  response.assertBodyContains({
    data: {
      title: 'Plataforma de Crowdfunding para Arte [Updated]',
    },
  })
  assert.notEqual('Plataforma de Crowdfunding para Arte', 'Plataforma de Crowdfunding para Arte [Updated]')
})

test('get all projects', async ({ client, route, assert }) => {
  const count = (await Project.all()).length
  const user = await User.find(1)
  const response = await client
    .get(route('ProjectsController.index'))
    .guard('api')
    .loginAs(user)

  const data = response.body().data
  response.assertStatus(200)
  assert.equal(count, data.length)
})

test('show project', async ({ client, route }) => {
  const project = await Project.find(1)
  const user = await User.find(1)
  const response = await client
    .get(route('ProjectsController.show', {'id': 1}))
    .guard('api')
    .loginAs(user)

  response.assertStatus(200)
  response.assertBodyContains({data: {
    id: project?.id,
    title: project?.title,
  }})
})

test('destroy project', async ({ client, route, assert }) => {
  const user = await User.find(1)
  const response = await client
    .delete(route('ProjectsController.destroy', {'id': 1}))
    .guard('api')
    .loginAs(user)

  const project = await Project.find(1)
  response.assertStatus(200)
  response.assertBodyContains({ response: 'success' })
  assert.isNull(project)
})
