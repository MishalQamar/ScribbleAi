import { NextResponse, type NextRequest } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: NextRequest) {
  const { image, prompt } = await request.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const model =
    'jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117';

  const input = {
    image,
    prompt,
    a_prompt: 'best quality, extremely detailed',
    n_prompt:
      'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality',
  };

  const output = await replicate.run(model, { input });

  if (!output) {
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
  console.log(output);
  return NextResponse.json({ output }, { status: 201 });
}
