import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { TasksWithProjects } from '../supaQueries'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { to: `/tasks/${row.original.id}`, class: 'text-left font-medium underline block w-full hover:bg-muted ' }, () =>
        row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },

        h(AppInPlaceEditStatus, { modelValue: row.original.status, readOnly: true }),
      )
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            { to: `/projects/${row.original.projects.slug}`, class: 'text-left font-medium underline block w-full hover:bg-muted ' },
            () => row.original.projects?.name,
          )
        : ''
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      const collabsData = row.original.collaborators.map(({profile}) => profile)

      return h(
        'div',
        { class: 'text-left font-medium' },
        collabsData.map(collab => {
          return h(RouterLink, { to: `/users/${collab.username}` }, () => {
            return h(
              Avatar,
              {
                class: 'hover:scale-110 transition-transform ',
              },
              () => h(AvatarImage, { src: collab.avatar_url || '' }),
            )
          })
        })
      )
    },
  },
]
