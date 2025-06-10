import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function RemoveUserPermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const currentUser = await stackServerApp.getUser({ or: "redirect" });
  if (!currentUser)
    throw new Error("401: Unauthorized");
  const modoTeam = await stackServerApp.getTeam("3086b24e-6828-4b66-b097-58cedaa1ac9c");
  if (!modoTeam)
    throw new Error("Team 'modo' introuvable");
  const userToRemove = await stackServerApp.getUser(id);
  if (!userToRemove)
    throw new Error("404: Utilisateur introuvable");
  try {
    await modoTeam.removeUser(userToRemove.id);
  } catch (error) {
    throw new Error("500: Échec du retrait de l'utilisateur de l'équipe");
  }
  return redirect("/admin/users");
}
