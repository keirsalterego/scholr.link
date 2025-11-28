import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

// This file serves the actions.json for Solana Blinks discovery
export async function GET() {
  const payload: ActionsJson = {
    rules: [
      // Map all action routes
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      ...ACTIONS_CORS_HEADERS,
      "Content-Type": "application/json",
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
}
