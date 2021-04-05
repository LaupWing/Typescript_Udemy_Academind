import React from 'react'

interface TodoListProps {
   items: {
      id: string,
      text: string
   }[]
   onDeleteTodo:(todoId:string)=>void
}

const TodoList: React.FC<TodoListProps> = ({items, onDeleteTodo}) =>{
   return (
      <ul>{items.map(todo => 
         <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={()=>onDeleteTodo(todo.id)}>Delete</button>
         </li> 
         )}
      </ul>
   )
}

export default TodoList