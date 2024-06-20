import express from 'express'
import { createNotes, getAllNotes, getNotesById, updateNotes, deleteNotes } from '../controller/notes.controller.js'

const router = express.Router()

router.post('/notes', createNotes)
router.get('/notes', getAllNotes)
router.get('/notes/:id', getNotesById)
router.put('/notes/:id', updateNotes)
router.delete('/notes/:id', deleteNotes)

export default router
