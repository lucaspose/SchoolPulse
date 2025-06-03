"use client";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Plus, Minus } from "lucide-react";  
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from "@stackframe/stack";

export function UserList({ users }: { users: any[] }) {
  const router = useRouter();
  const user = useUser();
  const isAdmin = user?.usePermission('admin');

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Moderation</h1>
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">User Moderation</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((u) => (
            <div key={u.id} className="border rounded p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{u.displayName ?? "No Name"}</h2>
                <p className="text-gray-700 mb-1">Email: {u.primaryEmail ?? "No Email"}</p>
                <p className="text-gray-500 mb-1">ID: {u.id}</p>
                <p className="text-gray-500">
                  Created At: {u.signedUpAt ? new Date(u.signedUpAt).toLocaleDateString() : "Unknown"}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button
                      className="bg-gray-700 hover:bg-red-600"
                      variant="destructive"
                      aria-label={`Delete user ${u.displayName ?? u.id}`}
                      >
                          <Trash size={16} strokeWidth={2} aria-hidden="true" />
                      </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Warning: Deleting this user will permanently remove their account and all associated data from the system. This action cannot be undone. Please ensure you have reviewed all necessary information before proceeding.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                          <Button className="hover:bg-red-500" onClick={() => router.push(`/admin/users/delete/${u.id}`)}>
                              Delete
                          </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  className="bg-gray-700 hover:bg-blue-600"
                  variant="destructive"
                  aria-label={`Edit user ${u.displayName ?? u.id}`}
                  onClick={() => router.push(`/admin/users/edit/${u.id}`)}
                >
                  <Edit size={16} strokeWidth={2} aria-hidden="true" />
                </Button>
                {isAdmin ?
                  <div>
                  <Button
                    className="bg-gray-700 hover:bg-green-600"
                    variant="destructive"
                    aria-label={`add perm ${u.displayName ?? u.id}`}
                    onClick={() => router.push(`/admin/users/perm/add/${u.id}`)}
                  >
                    <Plus size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                  <Button
                    className="bg-gray-700 hover:bg-red-600"
                    variant="destructive"
                    aria-label={`add perm ${u.displayName ?? u.id}`}
                    onClick={() => router.push(`/admin/users/perm/delete/${u.id}`)}
                  >
                    <Minus size={16} strokeWidth={2} aria-hidden="true" />
                  </Button>
                  </div> : <></>
                } 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}