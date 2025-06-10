import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function AddUserPerm({ params }: { params: { id: string } }) {
  const { id } = await params;

  const currentUser = await stackServerApp.getUser({ or: "redirect" });
  if (!currentUser) {
    throw new Error("401: Unauthorized");
  }

  const adminTeam = await currentUser.getTeam('bbc7a225-bff8-46e6-b779-77cc06fadb2c');
  console.log("Admin team:", adminTeam);
  if (!adminTeam) {
    throw new Error("403: You must be part of the admin team");
  }

  const modoTeam = await stackServerApp.getTeam('3086b24e-6828-4b66-b097-58cedaa1ac9c');
  if (!modoTeam) {
    throw new Error("Team 'modo' does not exist");
  }

  const userToInvite = await stackServerApp.getUser(id);
  if (!userToInvite) {
    throw new Error("404: User not found");
  }

  try {
    if (!userToInvite.primaryEmail)
      throw new Error("User does not have a primary email");
    await modoTeam.inviteUser({ email: userToInvite.primaryEmail, callbackUrl: `https://api.stack-auth.com/api/v1/team-invitations/accept/` });
  } catch (error) {
    console.error("Failed to add user to team", error);
    throw new Error("500: Unable to add user to team");
  }

  return redirect("/admin/users");
}
