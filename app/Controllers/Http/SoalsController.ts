import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Application from "@ioc:Adonis/Core/Application";
import Soal from "App/Models/Soal";
import Matakuliah from "App/Models/Matakuliah";
import Komentar_soal from "App/Models/KomentarSoal";

import _komentar_soals from "Database/migrations/6_komentar_soals";

export default class SoalsController {
  public async index({ view }: HttpContextContract) {
    const matakuliah = await Matakuliah.all();
    return view.render("auth/uploadSoal", { matakuliah });
  }
  public async store({ request, response, session }) {
    const isi_soal = request.file("formFile");
    const semester = request.input("semester");
    const id_mk = request.input("mk");
    const nama_soal = request.input("namasoal");
    const nama = session.get("nama");

    session.put("semester", semester);

    if (!nama_soal) {
      return response.redirect("/uploadSoal");
    }

    if (!isi_soal) {
      return response.redirect("/uploadSoal");
    }
    await isi_soal.move(Application.publicPath("uploads"));
    await Soal.create({
      nama,
      id_mk,
      nama_soal,
      isi_soal: isi_soal.fileName,
    });

    return response.redirect("/");
  }

  public async show({ view, request, session }: HttpContextContract) {
    const semester = request.input("semester");
    const mk = await Matakuliah.query()
      .where("id_semester", semester)
      .orderBy("id", "asc");
    let sks = 0;
    let id = request.input("edit");
    if (id != null) {
      session.put("edit", id);
    } else {
      session.put("edit", 0);
    }
    mk.forEach((mk) => {
      sks += mk.sks;
    });

    session.put("id_semester", semester);

    return view.render("auth/semester", { mk, sks });
  }

  public async showsoal({ view,response, request, session }: HttpContextContract) {
    let id_mk = request.input("matakuliah_id");
    const mk = await Matakuliah.query()
      .where("id", id_mk)
      .orderBy("id", "asc")
      .firstOrFail();
    const soal = await Soal.query().where("id_mk", id_mk).orderBy("id", "asc");

    let id = request.input("edit");
    if (id == 1) {
      session.put("edit", id);
      const matakuliah = await Matakuliah.all();
      return view.render("auth/uploadSoal", { matakuliah });
    }else if (id == 3) {
      session.put("edit", id);
    } else {
      session.put("edit", 0);
    }

    session.put("namamk", mk.nama);
    session.put("id_matakuliah", id_mk);

    return view.render("auth/soal", { soal });
  }

  public async lihatsoal({ view, request }: HttpContextContract) {
    let id_soal = request.input("soals_id");
    const soal = await Soal.query().where("id", id_soal).orderBy("id", "asc");
    const komentar_soal = await Komentar_soal.query()
      .where("id_soal", id_soal)
      .orderBy("id", "asc");

    return view.render("auth/lihatsoal", { soal, komentar_soal });
  }

  public async komentar({ response, request }: HttpContextContract) {
    let id_soal = request.input("soals_id");
    const nama = request.input("nama");
    const isi_komentar = request.input("isi_komentar");
    const hapus = request.input("hapus");
    const id = request.input("komentar_id");

    if (hapus == "1") {
      await Komentar_soal.query().where("id", id).delete();
      return response.redirect("/lihatsoal?soals_id=" + id_soal);
    }

    if (!nama) {
      return response.redirect("/lihatsoal?soals_id=" + id_soal);
    }
    if (!isi_komentar) {
      return response.redirect("/lihatsoal?soals_id=" + id_soal);
    }
    await Komentar_soal.create({ id_soal, nama_komentar: nama, isi_komentar });

    return response.redirect("/lihatsoal?soals_id=" + id_soal);
  }

  public async editmatakuliah({ response, request, session }: HttpContextContract) {
    const semester = request.input("semester");
    let cancel = request.input("cancel");
    if (session.get("edit") == 1) {
      
      if (cancel == "2") {
        return response.redirect("/semester?semester=" + semester);
      }else{
        const kode_mk = request.input("kode");
        const nama_mk = request.input("nama");
        const sks = request.input("sks");
        if (!kode_mk) {
          session.flash('error', 'Error! KodeMata Kuliah tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        if (!nama_mk) {
          session.flash('error', 'Error! Nama Mata Kuliah tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        if (!sks) {
          session.flash('error', 'Error! SKS tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        await Matakuliah.create({ id_semester: semester, kode: kode_mk, nama: nama_mk, sks: sks});
        return response.redirect("/semester?semester=" + semester);
      }
    }else if (session.get("edit") == 3) {
      if (cancel == "2") {
        return response.redirect("/semester?semester=" + semester);
      }
      let id = request.input("hapus");
      const soal = await Soal.query().where("id_mk", id).orderBy("id", "asc");
      await Komentar_soal.query().whereIn("id_soal", soal.map(row => row.id.toString())).delete();
      await Soal.query().where("id_mk", id).delete();
      await Matakuliah.query().where("id", id).delete();
      return response.redirect("/semester?semester=" + semester);

    }else{
      session.put("matakuliah_id", request.input("update"));
      if (cancel == "2") {
        session.put("matakuliah_id", -1);
        return response.redirect("/semester?semester=" + semester);
      }else if (cancel == "3") {
        let id = request.input("update");
        const kode_mk = request.input("kode");
        const nama_mk = request.input("nama");
        const sks = request.input("sks");
        if (!kode_mk) {
          session.flash('error', 'Error! Kode Mata Kuliah tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        if (!nama_mk) {
          session.flash('error', 'Error! Nama Mata Kuliah tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        if (!sks) {
          session.flash('error', 'Error! SKS tidak boleh kosong!')
          return response.redirect("/semester?semester=" + semester);
        }
        await Matakuliah.query().where("id", id).update({id_semester: semester, kode: kode_mk, nama: nama_mk, sks: sks});
        session.put("matakuliah_id", -1);
        console.log("kode_mk");
        return response.redirect("/semester?semester=" + semester);
      }
      return response.redirect("/semester?semester=" + semester + "&edit=2");
    }
    
  }

  public async editsoal({ response, request, session }: HttpContextContract) {
    const id_matakuliah = request.input("matakuliah_id");
    let cancel = request.input("cancel");
    if (session.get("edit") == 3) {
      if (cancel == "2") {
        return response.redirect("/soal?matakuliah_id=" + id_matakuliah);
      }
      let id = request.input("hapus");
      console.log(id);
      await Komentar_soal.query().where("id_soal", id).delete();
      await Soal.query().where("id", id).delete();
      return response.redirect("/soal?matakuliah_id=" + id_matakuliah);

    }
    
  }
}
