import {RequestHandler} from 'express'
import {Todo} from '../models/todo'
let TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next)=>{
   const text = (req.body as {text: string}).text
   const newTodo = new Todo(Math.random().toString(), text)

   TODOS.push(newTodo)
   res.status(201).send({message: 'Created the todo', createdTodo: newTodo})
}


export const getTodos: RequestHandler = (req, res, next)=>{
   res.json({todos: TODOS})
}


export const updateTodos: RequestHandler<{id: string}> = (req, res, next)=>{
   const id = req.params.id
   const updatedText = (req.body as {text: string}).text
   TODOS = TODOS.map(todo=>{
      if(todo.id === id){
         todo.text = updatedText
      }
      return todo
   })
   res.json({message:'updated'})
}

export const deleteTodos: RequestHandler<{id: string}> = (req, res, next)=>{
   const id = req.params.id
   TODOS = TODOS.filter(todo=>todo.id !== id)
   res.json({message:'deleted'})
}

