<script setup lang="ts">
import { MenuKey, type MenuInjectionOptions } from '@/utils/injectionKeys'
import { useWindowSize } from '@vueuse/core'

const router = useRouter()

const { menuOpen, toggleMenu } = inject(MenuKey) as MenuInjectionOptions

const { width } = useWindowSize()

const links = [
  { title: 'Dashboard', to: '/', icon: 'lucide:house' },
  { title: 'Projects', to: '/projects', icon: 'lucide:building-2' },
  { title: 'My Tasks', to: '/tasks', icon: 'lucide:badge-check' },
]

const accountLinks = [
  { title: 'Profile', to: '/profile', icon: 'lucide:user' },
  { title: 'Sign Out', icon: 'lucide:log-out' },
]

const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logOut } = await import('@/utils/supaAuth')
    const isLoggedOut = await logOut()

    if (isLoggedOut) router.push('/login')
  }
}

defineEmits(['taskClicked'])

watchEffect(() => {
  if (width.value > 1024) {
    menuOpen.value = true
  } else {
    menuOpen.value = false
  }
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{
      'w-52': menuOpen,
      'w-24': !menuOpen,
    }"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button variant="outline" size="icon" class="w-8 h-8" @click="toggleMenu">
        <iconify-icon icon="lucide:menu" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <iconify-icon icon="lucide:plus" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">Task</DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @action-clicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
