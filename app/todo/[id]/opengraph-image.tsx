import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

type IconProp = {
  params: Promise<{ id: string }>;
};

export const contentType = 'image/jpeg';
export const size = { width: 1200, height: 630 };

export default async function TodoImage({ params }: IconProp) {
  const { id } = await params;
  const todoImagePath = join(
  process.cwd(), 
  'public', 
  'todoImage', 
  `todo${id}.jpg`
);

  try {
    // Reading as base64 is efficient for embedding
    const todoImageData = await readFile(todoImagePath, 'base64');
    const todoImageSrc = `data:image/jpeg;base64,${todoImageData}`;

    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <img alt="todo image" src={todoImageSrc} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
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