import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function DeleteUser({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const usersResult = await stackServerApp.listUsers();
    const user = usersResult.find((u) => u.id === id);

    if (!user)
        return <div>User not found</div>;
    await user.delete();
    return redirect('/admin/users')
}