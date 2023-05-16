import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

class AuthController {
  
  //public async index({view}) {
  // return view.render('auth/login')
  //}

  public async login({ request, auth, response, session }: HttpContextContract) {
    const { username, password } = request.all();
    

    try {
      const user = await User.findBy("username", username);
      
      if (!user) {
        session.flash('error', 'Username atau Password salah!')
        return response.redirect('/login');
      }
      // Gunakan method `verify` untuk memverifikasi password
      await Hash.verify(user.password, password);

      await auth.use("web").attempt(username, password);
      session.put('role', 1)
      session.put('nama', user.nama)
      
      
      return response.redirect('/')
    } catch (error) {
      session.flash('error', 'Username atau Password salah!')
      return response.redirect('/login');
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const { nama, username, password } = request.all();
    try {
      const user = await User.create({ nama, username, password: password });
      return response.status(201).json(user);
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ message: "Failed to create user", error: error.message });
    }
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    session.put('role',0)
  await auth.use("web").logout();
  return response.redirect("/login");
}


}

export default AuthController;
