// import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
// import { join } from "path";

type IconProp = {
  params: Promise<{ id: string }>;
};

export const contentType = 'image/jpeg';
export const size = { width: 1200, height: 630 };

export default async function TodoImage({ params }: IconProp) {
  const { id } = await params;
  // const todoImagePath = join(
  // process.cwd(), 
  // 'public', 
  // 'todoImage', 
  // `todo${id}.jpg`
  // );

// 1. Get the domain (Vercel provides this automatically)
const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000';

// 2. Ensure we have the right protocol (https for production, http for local)
const protocol = domain.includes('localhost') ? 'http' : 'https';

// 3. Construct the clean URL
const baseUrl = `${protocol}://${domain}`;
const imageUrl = `${baseUrl}/TodoImage/todo${id}.jpg`;

  try {
    // Reading as base64 is efficient for embedding
    // const todoImageData = await readFile(todoImagePath, 'base64');
    // const todoImageSrc = `data:image/jpeg;base64,${todoImageData}`;

    const response = await fetch(imageUrl);
    
    if (!response.ok) throw new Error('Image not found');

    // 2. Convert to ArrayBuffer then to Base64
    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const imageSrc = `data:image/jpeg;base64,${base64Data}`;

    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <img alt="todo image" src={imageSrc} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      ),
      { ...size }
    );
  } catch (_) {
    // CRITICAL: Every child must be inside a flex div if there's more than one
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
            width: '100%',
            height: '100%',
            display: 'flex', // Mandatory
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Child 1 */}
          <div style={{ display: 'flex', fontSize: 42, color: '#60a5fa', marginBottom: 20 }}>
            Todo Task #{id}
          </div>
          
          {/* Child 2 - MUST be in a flex div, not just {id} alone */}
          <div style={{ display: 'flex', fontSize: 24, color: '#9ca3af' }}>
            Reference ID: {id}
          </div>
        </div>
      ),
      { ...size }
    );
  }
}