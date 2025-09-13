import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { imageGenerationService } from '@/services/image-generation.service';

const requestSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  prompt: z.string().min(1, 'Prompt is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, prompt } = requestSchema.parse(body);

    const result = await imageGenerationService.generateLegoImage({
      image,
      prompt,
    });

    return NextResponse.json(
      { output: result.imageUrl },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
