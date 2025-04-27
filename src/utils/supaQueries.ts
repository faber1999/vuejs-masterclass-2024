import { supabase } from '@/lib/supabaseClient'
import type { CreateNewTask } from '@/types/CreateNewForm'
import type { Database } from '@base/database/types'
import type { QueryData } from '@supabase/supabase-js'

/* Queries for Supabase Database */

export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects (
      id,
      name,
      slug
    ),
    collaborators:task_collaborators (
      profile:profiles (
        id,
        username,
        avatar_url
      )
    )
  `)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

/* Projects Queries */

export const projectsQuery = supabase.from('projects').select(`
    *,
    collaborators:project_collaborators (
      profile:profiles (
        id,
        username,
        avatar_url
      )
    )
  `)
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
        *,
        tasks (
          id,
          name,
          status,
          due_date
        ),
        collaborators:project_collaborators (
          profile:profiles (
            id,
            username,
            avatar_url
          )
        )
      `,
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return supabase.from('projects').update(updatedProject).eq('id', id)
}

/* Tasks queries */

export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `*,
      projects (
        id,
        name,
        slug
      ),
      owner:profiles!tasks_profile_id_fkey (
        id,
        full_name
      ),
      collaborators:task_collaborators (
        profile:profiles (
          id,
          username,
          avatar_url
        )
      )`,
    )
    .eq('id', Number(id))
    .single()

export type Task = QueryData<ReturnType<typeof taskQuery>>

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return supabase.from('tasks').update(updatedTask).eq('id', id)
}

export const deleteTaskQuery = (id: number) => {
  return supabase.from('tasks').delete().eq('id', id)
}

/* Profiles queries */

export const profileQuery = ({ column, value }: { column: keyof Database['public']['Tables']['profiles']['Row']; value: string }) => {
  return supabase.from('profiles').select('*').eq(column, value).single()
}

export const profilesQuery = supabase.from('profiles').select('id, full_name')

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
}

/* Collabs queries */

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const createNewTaskQuery = (newTask: CreateNewTask) => {
  return supabase.from('tasks').insert(newTask)
}
