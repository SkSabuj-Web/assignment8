import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./app/lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy auth error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/safe", "/protected"],
};
