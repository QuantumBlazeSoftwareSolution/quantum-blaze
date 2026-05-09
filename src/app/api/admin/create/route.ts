import { NextResponse } from "next/server";
import { createAdminUser } from "@/lib/db/crud/admins/write";

export async function POST(request: Request) {
  try {
    // 2. Parse request body
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, name" },
        { status: 400 }
      );
    }

    // IMPORTANT: In a real production app, you MUST hash the password here 
    // using bcrypt or argon2 before saving it to the database!
    // Example: const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create Admin in Database
    const newAdmin = await createAdminUser({
      email,
      password, // Should be hashed
      name,
      role: role || "admin",
      status: "active",
    });

    if (!newAdmin) {
      return NextResponse.json(
        { error: "Failed to create admin account. Email might already exist." },
        { status: 500 }
      );
    }

    // 4. Return success (don't return the password!)
    return NextResponse.json(
      { 
        message: "Admin account created successfully",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          role: newAdmin.role
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("API Error [Create Admin]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
