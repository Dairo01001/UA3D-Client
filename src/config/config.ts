export const config = {
  apiUrl: import.meta.env.VITE_BACK_URL || 'http://localhost:3004',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:3004',
  pvtoManagerUrl:
    import.meta.env.VITE_PVTO_MANAGER_URL || 'http://localhost:3004',
  openManagerUrl:
    import.meta.env.VITE_OPEN_MANAGER_URL || 'http://localhost:3004',
  port: 3004,
  commandSearchURL:
    import.meta.env.VITE_COMMAND_SEARCH_URL ||
    'https://ocse.onrender.com/search'
}
