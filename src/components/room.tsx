// src/components/room.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react";

export function Room({ id, children }: { id: string; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!}>
      <RoomProvider 
        id={id} 
        initialPresence={{ text: "", timestamp: 0, userName: "" }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
