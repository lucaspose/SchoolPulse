import { useUser } from "@stackframe/stack";

export function useUserId() {
        const user = useUser();
        const author = user ? user.id : null;
        return author;
}
