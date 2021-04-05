import React, {useRef} from 'react'

interface NewTodoProps {
   onAddTodo: (todo: string) => void
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) =>{
   const textInputRef = useRef<HTMLInputElement>(null)
   
   const todoSumbitHandler = (event: React.FormEvent):void =>{
      event.preventDefault()
      const enteredText = textInputRef.current!.value
      onAddTodo(enteredText)
   }

   return <form onSubmit={todoSumbitHandler}>
      <div>
         <label htmlFor="todo-text">Todo Text</label>
         <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">ADD TODO</button>
   </form>
}

export default NewTodo