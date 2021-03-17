function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
   const orginalMethod = descriptor.value
   const adjDescriptor:PropertyDescriptor = {
      configurable: true,
      get(){
         const boundFn = orginalMethod.bind(this)
         return boundFn
      }
   }
   return adjDescriptor
}

class ProjectInput {
   templateElement: HTMLTemplateElement
   hostElement: HTMLDivElement
   element: HTMLFormElement
   titleInputElement: HTMLInputElement
   descriptionInputElement: HTMLInputElement
   peopleInputElement: HTMLInputElement

   constructor() {
      this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')
      this.hostElement = <HTMLDivElement>document.getElementById('app')

      const importedNode = document.importNode(this.templateElement.content, true)
      this.element = importedNode.firstElementChild as HTMLFormElement
      this.element.id = 'user-input'
      this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')
      this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')
      this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people')
      this.attach()
      this.configure()
   }
   private gatherUserInput():[string, string, number] | void{
      const enteredTitle = this.titleInputElement.value
      const enteredDescription = this.titleInputElement.value
      const enteredPeople = this.titleInputElement.value
      this.clearInputs()
      if(
         enteredDescription.trim().length === 0 ||
         enteredTitle.trim().length === 0 ||
         enteredPeople.trim().length === 0 
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
         console.log(title)
         console.log(description)
         console.log(people)
      }
   }

   private attach() {
      this.hostElement.insertAdjacentElement('afterbegin', this.element)
   }

   private configure() {
      this.element.addEventListener('submit', this.submitHandler.bind(this))
   }
}


const projectInput = new ProjectInput()