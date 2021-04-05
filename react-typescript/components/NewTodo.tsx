import React, {useRef} from 'react'

const NewTodo: React.FC = () =>{
   const textInputRef = useRef<HTMLInputElement>(null)
   
   const todoSumbitHandler = (event: React.FormEvent):void =>{
      event.preventDefault()
      const enteredText = textInputRef.current!.value
      console.log(enteredText)
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