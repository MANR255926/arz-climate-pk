import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, city } = body || {};

    // Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!city || typeof city !== "string" || city.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: "Please provide your city." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check if Supabase credentials are configured
    if (supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://your-supabase-project.supabase.co") {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase
        .from("community_members")
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            city: city.trim(),
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to save submission to database: " + error.message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "You've successfully joined the Arz community!",
        data,
      });
    } else {
      // Fallback mode for local development when Supabase credentials aren't set yet
      console.log("[Arz Join API] Form submission received (Demo Mode):", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        city: city.trim(),
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message:
          "Form submitted successfully! (Note: Configure NEXT_PUBLIC_SUPABASE_URL in .env.local to insert into your Supabase database)",
      });
    }
  } catch (err: unknown) {
    console.error("Join API route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
