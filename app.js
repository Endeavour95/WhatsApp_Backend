import express from 'express'

import { getContact, getContactMessages, getContacts, getMessages } from './database.js'

const app = express()

app.use(express.json())

app.get("/contacts", async (req, res) => {
    const contacts = await getContacts()
    res.send(contacts)
})

// app.get("/messages", async (req, res) => {
//     const messages = await getMessages()
//     res.send(messages)
// })

app.get("/messages", async (req, res) => {
    const sendFrom = req.query.send_from;
    const sendTo = req.query.send_to;

    // Now you can use sendFrom and sendTo in your logic
    // For example, you can pass them to a function that fetches messages
    // http://localhost:3005/messages?send_from=1&send_to=2
    const messages = await getContactMessages(sendFrom, sendTo);

    res.send(messages);
});


app.get("/contacts/:id", async (req, res) => {
    const id = req.params.id
    const contact = await getContact(id)
    res.send(contact)
})

// app.post("/notes", async (req, res) => {
//     const { title, content } = req.body
//     const note = await createNote(title, content)
//     res.status(201).send(note)
// })

// app.delete("/notes/:id", async (req, res) => {
//     const id = req.params.id;
//     const result = await delNote(id);
//     console.log(result)
//     res.status(200).json(result);
// });

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3005, () => {
    console.log('Server is running on port 3005')
})