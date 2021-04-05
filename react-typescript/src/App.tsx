import React from 'react'
import TodoList from '../components/TodoList'
import NewTodo from '../components/NewTodo'

const App: React.FC = () => {
   const todos = [
      {
         id: 't1',
         text: 'Finish the course'
      }
   ]
   const todoAddHandler = (todo: string)=>{
      console.log(todo)
   }

   return (
      <div className="App">
         <NewTodo onAddTodo={todoAddHandler}/>
         <TodoList items={todos}/>
      </div>
   );
}

export default App;