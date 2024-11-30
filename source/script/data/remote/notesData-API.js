const URL = "https://notes-api.dicoding.dev/v2";
import Swal from "sweetalert2";

class NotesApi {
  static async addNote(newNote) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newNote.title,
          body: newNote.body,
        }),
      };

      const response = await fetch(`${URL}/notes`, options);
      const responseJson = await response.json();
      const data = responseJson.data;

      Swal.fire({
        title: "Berhasil!",
        text: "Notes berhasil dibuat!",
        icon: "success",
      });

      return data;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Notes tidak berhasil dibuat!",
        icon: "error",
      });
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
        options,
      );
      const responseJson = await response.json();

      console.log(responseJson.message);
      Swal.fire({
        title: "Terhapus!",
        text: "Notes berhasil dihapus!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Notes tidak berhasil dihapus!",
        icon: "error",
      });
    }
  }

  static async getNotesUnArchived() {
    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      const responseJson = await response.json();
      const data = responseJson.data;

      return data;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Sepertinya ada sesuatu yang salah..",
        icon: "error",
      });
    }
  }

  static async getNotesArchived() {
    try {
      const response = await fetch(
        "https://notes-api.dicoding.dev/v2/notes/archived",
      );
      const responseJson = await response.json();
      const data = responseJson.data;

      return data;
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Sepertinya ada sesuatu yang salah..",
        icon: "error",
      });
    }
  }

  static async archiveNote(noteId) {
    try {
      const options = {
        method: "POST",
      };

      const response = await fetch(`${URL}/notes/${noteId}/archive`, options);
      const responseJson = await response.json();

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Sepertinya ada sesuatu yang salah..",
        icon: "error",
      });
    }
  }

  static async non_archiveNote(noteId) {
    try {
      const options = {
        method: "POST",
      };

      const response = await fetch(`${URL}/notes/${noteId}/unarchive`, options);
      const responseJson = await response.json();

      console.log(responseJson.message);
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Ada sesuatu yang salah..",
        icon: "error",
      });
    }
  }
}

export default NotesApi;
