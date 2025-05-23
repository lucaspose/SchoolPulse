import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default async function RegisterPage() {
    const registerUser = async (formData: FormData) => {
        "use server";
        const username = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await db
            .select()
            .from(users)
            .where(
                (users) =>
                    or(eq(users.name, username), eq(users.email, email))
            )
            .execute();
        if (existingUser.length > 0)
            throw new Error("User already exists");
        await db.insert(users).values({ name: username, email, password: hashedPassword });
        revalidatePath("/");
        redirect("/");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form action={registerUser}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">
                            Username
                        </label>
                        <input type="text"
                        required
                        name="name"
                        id="name"
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email
                        </label>
                        <input type="email"
                        required
                        name="email"
                        id="email"
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Password
                        </label>
                        <input type="password"
                        required
                        name="password"
                        id="password"
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Register
                    </button>
                </form>
        </div>
    )
}