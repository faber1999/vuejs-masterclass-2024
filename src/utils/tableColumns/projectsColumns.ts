import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Projects } from '../supaQueries'

export const columns: (collabs: Ref<GroupedCollabs>) => ColumnDef<Projects[0]>[] = collabs => [
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
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      const collabsArray = collabs.value[row.original.id]
      return h(
        'div',
        { class: 'text-left font-medium' },
        collabs.value[row.original.id].map(collab => {
          return h(Avatar, () => h(AvatarImage, { src: collab.avatar_url || '' }))
        }),
      )
    },
  },
]
