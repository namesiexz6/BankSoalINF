import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  static authenticate() {
      throw new Error('Method not implemented.')
  }
  public async handle({ auth, response, session }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const token = session.get('token')
    if (!token) {
      const authenticate = await auth.use('web').authenticate()
      if (!authenticate) {
        await auth.check()
        response.redirect('/login')
      }
    }

    await next()
  }
}
