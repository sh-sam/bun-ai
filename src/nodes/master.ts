import { MessagesAnnotation } from "@langchain/langgraph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { aiModel } from "@config/models";
import { masterPrompt } from "@prompts/master";
import { ModelType, ModelVersion } from "@constants/models";

export async function masterNode(state: typeof MessagesAnnotation.State) {
  const model = aiModel(ModelType.OPENAI, ModelVersion.GPT_4O, 0.3);
  const structuredModel = model.withStructuredOutput(masterPrompt);
  // Extract previous messages
  const messages = state.messages;
  
  // Get the latest message content
  const latestMessage = messages[messages.length - 1]?.content || "";
  const response = await structuredModel.invoke([new HumanMessage({ content: latestMessage })]);
  // Create a new AI message with the structured response
  const aiMessage = new AIMessage({
    content: [
      { type: "text", text: response.text },
      { type: "action", action: response.action },
      { type: "confidence", confidence: response.confidence },
    ]
  });

  return { messages: [...messages, aiMessage]};
}