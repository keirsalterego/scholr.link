import { NextRequest } from "next/server";

export const runtime = "nodejs";

// This endpoint fetches campaigns for a specific user from a database
// For now, we'll return empty array and campaigns will be stored in localStorage on client
export async function GET(req: NextRequest) {
  try {
    const userAddress = req.nextUrl.searchParams.get("user");
    
    if (!userAddress) {
      return new Response(
        JSON.stringify({ error: "Missing user parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Implement database query to fetch campaigns for this user
    // For now, return empty array as campaigns will be stored in localStorage
    const campaigns: any[] = [];

    return new Response(JSON.stringify({ campaigns }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("user-campaigns error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch campaigns",
        details: error?.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
