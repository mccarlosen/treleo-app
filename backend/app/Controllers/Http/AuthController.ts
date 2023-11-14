import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async login ({request, response, auth}: HttpContextContract) {
    // schema validator
    const loginDataSchema = schema.create({
      username: schema.string([
        rules.trim(),
        rules.email(),
      ]),
      password: schema.string([
        rules.trim(),
      ]),
    })
    // validate and authenticate
    try {
      const data = await request.validate({
        schema: loginDataSchema,
        messages: {
          'username.required': 'El correo electrónico es requerido',
          'username.email': 'El correo electrónico es inválido',
          'password.required': 'La contraseña es requerida',
        },
      })
      const user = await User.query().where('email', data.username).first()
      if (!user) {
        return response.status(404).json({response: 'failed', message: 'User not found', data: {}})
      }
      if (!(await Hash.verify(user.password, data.password))) {
        throw new Error('Invalid credentials')
      }
      const token = await auth.use('api').generate(user, { expiresIn: '24 hrs' })
      response.json({response: 'success', data: token})
    } catch (error) {
      response.status(422).json({response: 'failed', message: error.message, data: error})
    }
  }

  public async logout ({ response, auth }: HttpContextContract) {
    await auth.use('api').logout()
    return response.json({response: 'success'})
  }

  public async getUser ({ response, auth }): Promise<User> {
    return response.json(await auth.use('api').user)
  }
}
