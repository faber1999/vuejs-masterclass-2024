import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Projects } from '../supaQueries'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

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
      const collabsData = collabs.value[row.original.id]
      const originalCollabs = row.original.collaborators
      return h(
        'div',
        { class: 'text-left font-medium' },

        collabsData
          ? collabsData.map(collab => {
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
          : originalCollabs?.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            }),
      )
    },
  },
]
