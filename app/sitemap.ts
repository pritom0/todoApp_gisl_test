// import axios from "axios";
import { MetadataRoute } from "next";
import { getTodosServer } from "./page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000'
  const protocol = domain === 'localhost:3000' ? 'http': 'https'
  const baseUrl = `${protocol}://${domain}`;
  try {
    // const todos = (await axios.get(`${protocol}/${domain}/api/todos`)).data 
    const todos = (await getTodosServer()) 
    if(!Array.isArray(todos)) 
      throw new Error('unable to fetch todos')

    const todoUrls = todos.map(todo => ({
      url: `${baseUrl}/todo/${todo.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))

    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1
      },
      {
        url: `${baseUrl}/practice/parallelRoute`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5

      },
      ...todoUrls
    ]
  } catch (error) {
    console.error("Sitemap generation failed", error);
    return [{ url: baseUrl, lastModified: new Date() }];
  }
}

