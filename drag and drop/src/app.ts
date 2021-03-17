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
      this.titleInputElement = <HTMLInputElement> this.element.querySelector('#title')
      this.descriptionInputElement = <HTMLInputElement> this.element.querySelector('#description')
      this.peopleInputElement = <HTMLInputElement> this.element.querySelector('#people')
      this.attach()
      this.configure()
   }

   private submitHandler(event: Event){
      event.preventDefault()
      console.log(this.titleInputElement.value)
   }

   private attach(){
      this.hostElement.insertAdjacentElement('afterbegin', this.element)
   }

   private configure(){
      this.element.addEventListener('submit', this.submitHandler.bind(this))
   }
}


const projectInput = new ProjectInput()