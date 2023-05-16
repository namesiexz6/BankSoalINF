/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("auth/beranda");
});


Route.post("/register", "AuthController.register").as("register");

Route.get("/semester", "SoalsController.show").as("tampilkansoal");
Route.post("/semester", "SoalsController.show").as("pilihsesmester");

Route.get("/soal", "SoalsController.showsoal").as("tamplikansoal");
Route.post("/soal", "SoalsController.showsoal").as("pilihsoal");


Route.get("/lihatsoal", "SoalsController.lihatsoal");
Route.post("/lihatsoal", "SoalsController.lihatsoal");
Route.post("/komentar", "SoalsController.komentar");



Route.group(() => {
  Route.post("/logout", "AuthController.logout").as("logout");
  Route.get("/uploadSoal", "SoalsController.index").as("selectmk");
  Route.post("/uploadSoal", "SoalsController.store").as("uploadsoal");
  Route.post("/editmatakuliah", "SoalsController.editmatakuliah");
  Route.post("/editsoal", "SoalsController.editsoal");
}).middleware(['auth'])

Route.group(() => {
  Route.get("/login", async ({ view }) => {
    return view.render("auth/login");
  });
  Route.post("/login", "AuthController.login").as("login");
}).middleware(['guest'])