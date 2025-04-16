import { createClient } from "@liveblocks/client";

// Define the type for our presence
export type Presence = {
  text?: string;
  timestamp?: number;
  userName?: string;
  isTyping?: boolean;
};

// Create a Liveblocks client
export const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!,
  throttle: 16,
}); 