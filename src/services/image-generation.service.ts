import Replicate from 'replicate';

interface GenerateImageRequest {
  image: string;
  prompt: string;
}

interface GenerateImageResponse {
  imageUrl: string;
}

const buildInput = (request: GenerateImageRequest) => {
  return {
    image: request.image,
    prompt: `${request.prompt}, LEGO brick style, made of colorful LEGO blocks, LEGO construction, blocky LEGO aesthetic`,
    a_prompt:
      'LEGO brick style, made of colorful LEGO blocks, LEGO construction, blocky LEGO aesthetic, best quality, extremely detailed, bright LEGO colors, LEGO minifigure style',
    n_prompt:
      'longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, realistic, photorealistic, smooth surfaces, organic shapes',
  };
};

const isValidOutput = (
  output: unknown
): output is [unknown, { url(): string }] => {
  return Array.isArray(output) && output.length >= 2;
};

export const imageGenerationService = {
  async generateLegoImage(
    request: GenerateImageRequest
  ): Promise<GenerateImageResponse> {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

    const model =
      'jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117';
    const input = buildInput(request);
    const output = await replicate.run(model, { input });

    if (!isValidOutput(output)) {
      throw new Error('Failed to generate image');
    }

    const imageUrl = output[1].url();
    return { imageUrl };
  },
};
