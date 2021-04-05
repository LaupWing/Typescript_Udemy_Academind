import {Router} from 'express'
import {createTodo} from '../controllers/todos'

const router = Router()

router.post('/', createTodo)

router.get('/', (req, res)=>{

})
router.patch('/', (req, res)=>{

})
router.delete('/', (req, res)=>{

})

export default router