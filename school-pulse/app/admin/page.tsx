import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const Data = [
    {
        name: "Users",
        className: "col-span-2",
        background: <div className="bg-blue-500 h-full w-full" />,
        Icon: () => <span className="text-white">👥</span>,
        description: "Manage users and their roles.",
        href: "/admin/users",
        cta: "Manage Users",
    },
    {
        name: "Posts",
        className: "col-span-1",
        background: <div className="bg-fuchsia-500 h-full w-full" />,
        Icon: () => <span className="text-white">📝</span>,
        description: "Moderate posts and comments.",
        href: "/admin/posts",
        cta: "Moderate Posts",
    },
    {
        name: "Logs & Statistics",
        className: "col-span-1",
        background: <div className="bg-green-500 h-full w-full" />,
        Icon: () => <span>📊</span>,
        description: "View logs and statistics.",
        href: "/admin/logs",
        cta: "View Logs",
    },
    {
        name: "Support",
        className: "col-span-2",
        background: <div className="bg-yellow-500 h-full w-full" />,
        Icon: () => <span className="text-white">💬</span>,
        description: "Manage support tickets and inquiries.",
        href: "/admin/support",
        cta: "Manage Support",
    }
]

export default function AdminPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
            <BentoGrid className="max-w-6xl w-full">
                {Data.map((item) => (
                    <BentoCard
                        key={item.name}
                        name={item.name}
                        className={item.className}
                        background={item.background}
                        Icon={item.Icon}
                        description={item.description}
                        href={item.href}
                        cta={item.cta}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
