import { Project, ProjectStatus } from '../models/project';

class State<T> {
   protected listeners: Listener<T>[] = []

   addListener(listenerFunction: Listener<T>){
      this.listeners.push(listenerFunction)
   }
}

type Listener<T> = (items:T[]) => void

class ProjectState extends State<Project>{
   private projects: Project[] = []
   private static instance: ProjectState
   private constructor() {
      super()
   }

   static getInstance(){
      if(this.instance){
         return this.instance
      }
      this.instance = new ProjectState()
      return this.instance
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

   moveProject(projectId: string, newStatus: ProjectStatus){
      const project = this.projects.find(prj=>prj.id === projectId)
      if(project && project.status !== newStatus){
         project.status = newStatus
         this.updateListeners()
      }
   }

   private updateListeners(){
      for (const listenerFn of this.listeners){
         listenerFn(this.projects.slice())
      }
   }
}

export const projectState = ProjectState.getInstance()