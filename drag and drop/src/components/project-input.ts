import { Component } from './base-component';
import { Validatable, validate } from '../util/validation';
import { autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';


export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
   titleInputElement: HTMLInputElement
   descriptionInputElement: HTMLInputElement
   peopleInputElement: HTMLInputElement

   constructor() {
      super('project-input', 'app', true, 'user-input')
      this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')
      this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')
      this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')
      this.configure()
   }
   renderContent(){}

   private gatherUserInput():[string, string, number] | void{
      const enteredTitle = this.titleInputElement.value
      const enteredDescription = this.titleInputElement.value
      const enteredPeople = this.titleInputElement.value
      this.clearInputs()
      const titleInput: Validatable ={
         value: enteredTitle,
         required: true,
         minLength: 5
      }
      const descriptionInput: Validatable ={
         value: enteredTitle,
         required: true,
         minLength: 5
      }
      const peopleInput: Validatable ={
         value: enteredTitle,
         required: true,
         min: 5,
         max: 5
      }

      if(
         !validate(titleInput) ||
         !validate(descriptionInput) ||
         !validate(peopleInput) 
      ){
         alert('invalid input')
         return
      }else{
         return [enteredTitle, enteredDescription, +enteredPeople]
      }

   }

   private clearInputs(){
      this.titleInputElement.value = ''
      this.descriptionInputElement.value = ''
      this.peopleInputElement.value = ''
   }

   @autobind
   private submitHandler(event: Event) {
      event.preventDefault()
      const userInput = this.gatherUserInput()
      if(Array.isArray(userInput)){
         const [title, description, people] = userInput
         projectState.addProject(title, description, people)
         this.clearInputs()
      }
   }
   configure() {
      this.element.addEventListener('submit', this.submitHandler.bind(this))
   }
}