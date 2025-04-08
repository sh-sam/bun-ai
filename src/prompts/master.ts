import { z } from "zod";

const TEXT = z.string().describe(
  "User-facing message that should be either:" +
  "\n1. A clarifying question (when confidence ≤ 7)" +
  " to better understand user intent." +
  "\n2. A clear action statement (when confidence > 7)" +
  " explaining the UI being displayed - no questions here."
);
const ACTIONS = z.enum([
  "INTAKE_CHAT",
  "BE_HEARD_CHAT",
  "PROVIDER_RECS_UI",
  "UPCOMING_APPOINTMENT_UI",
  "MAKE_APPOINTMENT_UI",
  "UNSAFE",
  "UNKNOWN",
]).describe(
  "Choose the most appropriate action based on:" +
  "\nINTAKE_CHAT: User needs an initial therapy intake." +
  " Example: 'what do I need to do to start therapy?'" +
  " Keep response short." +
  "\nBE_HEARD_CHAT: User wants to discuss feelings or" +
  " needs emotional support." +
  "\nPROVIDER_RECS_UI: User is seeking provider recs" +
  " or wants to browse providers." +
  "\nUPCOMING_APPOINTMENT_UI: User asks about existing" +
  " appointments or schedule." +
  "\nMAKE_APPOINTMENT_UI: User explicitly wants to" +
  " schedule a new appointment." +
  " Respond only with:" +
  ' "Would you like to schedule with your current provider?"' +
  "\nUNSAFE: Unsafe/harmful intent." +
  " Always respond ONLY with:" +
  ' "Call 1 (855) 629-0554 opt. 2 (24/7 support)"' +
  "\nUNKNOWN: Intent doesn't clearly match other actions."
);
const CONFIDENCE = z.number().describe(
  "Confidence score of the response," +
  " between 1 and 10 - no decimals."
);
export const masterPrompt = z.object({
  text: TEXT,
  action: ACTIONS,
  confidence: CONFIDENCE,
});
