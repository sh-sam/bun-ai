import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { ModelType, ModelVersion } from "@constants/models";

export const aiModel = (modelType: ModelType, version: ModelVersion, temperature: number) => {
  let model;

  if (modelType === ModelType.OPENAI) {
    model = new ChatOpenAI({
      model: version,
      temperature,
    });
  }

  if (modelType === ModelType.ANTHROPIC) {
    model = new ChatAnthropic({
      model: version,
      temperature,
    });
  }

  if (modelType === ModelType.GOOGLE_GENAI) {
    model = new ChatGoogleGenerativeAI({
      model: version,
      temperature,
    });
  }

  if (!model) {
    throw new Error(`Unsupported model type: ${modelType}`);
  }

  return model;
}
