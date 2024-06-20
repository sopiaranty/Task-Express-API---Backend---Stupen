import { query } from "../database/db.js";

// Fungsi untuk membuat note baru
export const createNotes = async (req, res) => {
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
        return res.status(400).json({ success: false, msg: 'Title, datetime, and note are required' });
    }
    try {
        await query("INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)", [title, datetime, note]);
        return res.status(200).json({ success: true, msg: "Berhasil menambahan notes" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};

// Fungsi untuk menampilkan semua notes
export const getAllNotes = async (req, res) => {
    try {
        const result = await query("SELECT * FROM notes");
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};

// Fungsi untuk menampilkan salah satu note berdasarkan ID
export const getNotesById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query("SELECT * FROM notes WHERE id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({ success: false, msg: "Note tidak ditemukan" });
        }
        return res.status(200).json({ success: true, data: result[0] });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};

// Fungsi untuk mengupdate note berdasarkan ID
export const updateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    if (!title || !datetime || !note) {
        return res.status(400).json({ success: false, msg: 'Title, datetime, and note are required' });
    }
    try {
        await query("UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?", [title, datetime, note, id]);
        return res.status(200).json({ success: true, msg: "Notes berhasil diubah" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};

// Fungsi untuk menghapus note berdasarkan ID
export const deleteNotes = async (req, res) => {
    const { id } = req.params;
    try {
        await query("DELETE FROM notes WHERE id = ?", [id]);
        return res.status(200).json({ success: true, msg: "Notes berhasil dihapus" });
    } catch (error) {
        console.log("Terjadi kesalahan", error);
        return res.status(500).json({ success: false, msg: "Server error" });
    }
};
