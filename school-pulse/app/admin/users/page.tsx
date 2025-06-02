import React from "react";
import { stackServerApp } from "@/stack";
import { UserList } from "./UserList";

export default async function UserModerationPage() {
  const users = await stackServerApp.listUsers();

  const safeUsers = (users ?? []).map(u => ({
    id: u.id,
    displayName: u.displayName,
    primaryEmail: u.primaryEmail,
    profileImageUrl: u.profileImageUrl,
    signedUpAt: u.signedUpAt,
  }));

  return <UserList users={safeUsers} />;
}