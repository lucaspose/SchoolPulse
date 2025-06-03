import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function DelUserPerm(params: { params: Promise<{ id: string }> }) {
    const { id } = await params.params;
    const user = await stackServerApp.getUser(id);
    const currentUser = await stackServerApp.getUser({ or : 'redirect'});
    const team = await stackServerApp.getTeam('modo');

    if (!currentUser)
        throw new Error("401: Unauthorized")
    if (!user)
        throw new Error("401: Unauthorized")
    team?.removeUser(user.id);
    return redirect(`/admin/users/`);
}