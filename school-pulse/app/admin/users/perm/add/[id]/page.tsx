import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function AddUserParmession(params: { params: Promise<{ id: string }> }) {
    const { id } = await params.params;
    const user = await stackServerApp.getUser(id);
    const permissions = user?.usePermission('admin');

    if (!user)
        throw new Error("401: Unauthorized")
    if (!permissions)
        throw new Error("401: Unauthorized")
    user.grantPermission('access_admin_dashboard');
    return redirect(`/admin/users/`);
}