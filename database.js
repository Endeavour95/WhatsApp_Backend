import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getContacts() {
    const [rows] = await pool.query("SELECT * FROM contacts")
    return rows
}

export async function getMessages() {
    const [rows] = await pool.query("SELECT * FROM messages")
    return rows
}

export async function getContactMessages(sendFrom, sendTo) {
    const [rows] = await pool.query(`
        SELECT msg.*, c1.contact_name AS sender_name, c2.contact_name AS receiver_name
        FROM messages msg
        JOIN contacts c1 ON msg.send_from = c1.id
        JOIN contacts c2 ON msg.send_to = c2.id
        WHERE (msg.send_from = ? AND msg.send_to = ?) OR (msg.send_from = ? AND msg.send_to = ?)
    `, [sendFrom, sendTo, sendTo, sendFrom]);

    return rows;
}



export async function getContact(id) {
    const [rows] = await pool.query(`SELECT * FROM contacts WHERE id = ?`, [id])
    return rows[0]
}

// export async function createNote(title, content) {
//     const [result] = await pool.query(
//         `INSERT INTO notes (title, content)
//         VALUES (?, ?)`,
//         [title, content]
//     )

//     const id = result.insertId
//     return getNote(id)
// }

// export async function delNote(id) {
//     const result1 = await pool.query(`DELETE FROM notes WHERE id = ?`, [id])

//     const result2 = await getNotes()
//     return result2
// }