import { NextResponse, type NextRequest } from 'next/server';
import Replicate from 'replicate';
import { z } from 'zod';

const requestSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  prompt: z.string().min(1, 'Prompt is required'),
});

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = requestSchema.parse(
      await request.json()
    );

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const model =
      'jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117';

    const input = {
      image,
      prompt: `${prompt}, LEGO brick style, made of colorful LEGO blocks, LEGO construction, blocky LEGO aesthetic`,
      a_prompt:
        'LEGO brick style, made of colorful LEGO blocks, LEGO construction, blocky LEGO aesthetic, best quality, extremely detailed, bright LEGO colors, LEGO minifigure style',
      n_prompt:
        'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, realistic, photorealistic, smooth surfaces, organic shapes',
    };

    const output = await replicate.run(model, { input });

    if (!output || !Array.isArray(output) || output.length < 2) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    // Extract URL from the generated image (output[1])
    const imageUrl = output[1].url();

    return NextResponse.json({ output: imageUrl }, { status: 200 });
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
