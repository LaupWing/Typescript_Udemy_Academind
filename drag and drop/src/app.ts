interface Validatable{
   value: string | number
   required?: boolean
   minLength?: number
   maxLength?: number
   min?: number
   max?: number
}
enum ProjectStatus{
   Active,
   Finished
}

class Project{
   constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
   ){

   }
}

type Listener = (items: Project[]) => void

class ProjectState{
   private projects: Project[] = []
   private listeners: Listener[] = []
   private static instance: ProjectState
   private constructor() {}

   static getInstance(){
      if(this.instance){
         return this.instance
      }
      this.instance = new ProjectState()
      return this.instance
   }

   addListener(listenerFunction: Listener){
      this.listeners.push(listenerFunction)
   }

   addProject(title: string, description: string, numberOfPeople: number){
      const newProject = new Project(
         Math.random().toString(),
         title,
         description,
         numberOfPeople,
         ProjectStatus.Active
      )
      this.projects.push(newProject)
      this.listeners.forEach(fn=>{
         fn([...this.projects])
      })
   }
}

const projectState = ProjectState.getInstance()

function validate(input: Validatable){
   let isValid = true
   if(input.required){
      isValid = isValid && input.value.toString().trim().length !== 0
   }
   if(input.minLength != null && typeof input.value === 'string'){
      isValid = isValid && input.value.length > input.minLength
   }
   if(input.maxLength != null && typeof input.value === 'string'){
      isValid = isValid && input.value.length < input.maxLength
   }
   if(input.min != null && typeof input.value === 'number'){
      isValid = isValid && input.value > input.min
   }
   if(input.max != null && typeof input.value === 'number'){
      isValid = isValid && input.value > input.max
   }
   return isValid
}

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

class ProjectList{
   templateElement: HTMLTemplateElement
   hostElement: HTMLDivElement
   element: HTMLElement
   assignedProjects: Project[]

   constructor(private type: 'active' | 'finished'){
      this.templateElement = <HTMLTemplateElement>document.getElementById('project-list')
      this.hostElement = <HTMLDivElement>document.getElementById('app')
      this.assignedProjects = []
      const importedNode = document.importNode(this.templateElement.content, true)
      this.element = importedNode.firstElementChild as HTMLElement
      this.element.id = `${this.type}-projects`
      this.attach()
      this.renderContent()
      projectState.addListener((projects: Project[])=>{
         const relevantProjects = projects.filter(project=>{
            if(this.type === 'active'){
               return project.status === ProjectStatus.Active
            }
            return project.status === ProjectStatus.Finished
         })
         this.assignedProjects = relevantProjects
         this.renderProjects()
      })
   }

   private renderProjects(){
      const list = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)
      list.innerHTML = ''
      this.assignedProjects.forEach(item=>{
         const li = document.createElement('li')
         li.textContent = item.title
         list.appendChild(li)
      })
   }

   private attach(){
      this.hostElement.insertAdjacentElement('beforeend', this.element)
   }
   private renderContent(){
      const listId = `${this.type}-projects-list`
      this.element.querySelector('ul')!.id = listId 
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'
   }
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

   private attach() {
      this.hostElement.insertAdjacentElement('afterbegin', this.element)
   }

   private configure() {
      this.element.addEventListener('submit', this.submitHandler.bind(this))
   }
}


const projectInput = new ProjectInput()
const activeProjectList = new ProjectList('active')
const finisehdProjectList = new ProjectList('finished')