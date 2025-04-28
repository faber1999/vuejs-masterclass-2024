import type { InjectionKey, Ref } from 'vue'

export interface MenuInjectionOptions {
  menuOpen: Ref<boolean>
  toggleMenu: () => void
}

export const MenuKey = Symbol() as InjectionKey<MenuInjectionOptions>
