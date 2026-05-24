import { create } from 'zustand';

interface AdminState {
  isSidebarOpen: boolean;
  selectedTab: string;
  searchTerm: string;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSelectedTab: (tab: string) => void;
  setSearchTerm: (term: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isSidebarOpen: true,
  selectedTab: 'dashboard',
  searchTerm: '',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
