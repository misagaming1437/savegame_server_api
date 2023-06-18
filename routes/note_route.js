import NoteServices from '../services/noteServices.js'
import express_promise from 'express-promise-router';

const router = express_promise();
export const initNoteRoute =(app)=>{

    router.post('/create', NoteServices.createNote)
    router.get('/', NoteServices.getAllNotes)
    router.delete('/deleteAll', NoteServices.deleteAllNotes)
    return app.use('/note', router);
}
export default{
    initNoteRoute
}