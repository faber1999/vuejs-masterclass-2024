import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import type { Projects } from '../supaQueries'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        { to: `/projects/${row.original.slug}`, class: 'text-left font-medium underline block w-full hover:bg-muted ' },
        () => row.getValue('name'),
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
