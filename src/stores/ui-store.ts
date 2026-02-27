import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface UIState {
    theme: Theme
    sidebarCollapsed: boolean
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    setSidebarCollapsed: (collapsed: boolean) => void
    toggleSidebar: () => void
}

function applyThemeToDOM(theme: Theme) {
    const root = document.documentElement
    if (theme === 'dark') {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }
}

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            sidebarCollapsed: false,

            setTheme: (theme) => {
                applyThemeToDOM(theme)
                set({ theme })
            },

            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark'
                applyThemeToDOM(newTheme)
                set({ theme: newTheme })
            },

            setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
            toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
        }),
        {
            name: 'applyflow-ui',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyThemeToDOM(state.theme)
                }
            },
        }
    )
)
