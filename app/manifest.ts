import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AKPritom Todo App',
    short_name: 'TodoApp',
    description: 'Manage your tasks efficiently',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/todoicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}