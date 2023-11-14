import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async create ({request}: HttpContextContract) {
    const firstname = request.input('firstname')
    const lastname = request.input('lastname')
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    })
    return user
  }

  public async getUserById ({ params }: HttpContextContract) {
    const user = await User.find(params?.id)
    return user
  }
}
