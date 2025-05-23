import { tasksWithProjectsQuery, taskQuery, updateTaskQuery, type Task, type TasksWithProjects, deleteTaskQuery } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)

  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof taskQuery | typeof tasksWithProjectsQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks('tasks')

    if (error) useErrorStore().setError({ error, errorCode: status })

    if (data) tasks.value = data

    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const getTask = async (id: string) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) useErrorStore().setError({ error, errorCode: status })

    if (data) task.value = data

    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    const { projects: _projects, owner: _owner, collaborators: _collaborators, id, ...taskProps } = task.value

    await updateTaskQuery(taskProps, id)
  }

  const deleteTask = async () => {
    if (!task.value) return

    await deleteTaskQuery(task.value.id)
  }

  return {
    getTasks,
    tasks,
    getTask,
    task,
    updateTask,
    deleteTask,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
