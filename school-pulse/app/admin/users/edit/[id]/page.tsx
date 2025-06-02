import { stackServerApp } from "@/stack";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default async function EditUser({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const usersResult = await stackServerApp.listUsers();
    const user = usersResult.find((u) => u.id === id);

    return (
        <div className="mx-auto max-w-lg justify-center">
          <h1 className="font-semibold text-2xl text-center py-2">Edit User</h1>
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <Table>
              <TableBody>
                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Name</TableCell>
                  <TableCell className="py-2">
                    <div className="group relative min-w-[300px]">
                    <label
                    htmlFor={id}
                    className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                    >
                        <span className="inline-flex bg-background px-2">{user?.displayName ?? "No name"}</span>
                    </label>
                    <Input id={id} type="name" placeholder="" />
                    </div>
                    </TableCell>
                </TableRow>
                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Email</TableCell>
                  <TableCell className="py-2">
                    <div className="group relative min-w-[300px]">
                    <label
                    htmlFor={id}
                    className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
                    >
                        <span className="inline-flex bg-background px-2">{user?.primaryEmail}</span>
                    </label>
                    <Input id={id} type="email" placeholder="" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Id</TableCell>
                  <TableCell className="py-2">{user?.id}</TableCell>
                </TableRow>
                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                    <TableCell className="bg-muted/50 py-2 font-medium">Created At</TableCell>
                    <TableCell className="py-2">{user?.signedUpAt ? user.signedUpAt.toLocaleString() : ""}</TableCell>
                </TableRow>
                <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                  <TableCell className="bg-muted/50 py-2 font-medium">Last Active</TableCell>
                  <TableCell className="py-2">{user?.lastActiveAt ? user.lastActiveAt.toLocaleString() : ""}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">User Info</p>
        </div>
    )
}