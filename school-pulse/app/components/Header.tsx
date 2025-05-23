import { Navbar1 } from "@/components/blocks/shadcnblocks-com-navbar1"

export function Header() {
    const Data = {
        menu: [
            {
                title: "Home",
                url: "/",
            },
            {
                title: "About",
                url: "/about",
            },
            {
                title: "Contact",
                url: "/contact",
            },
        ],
        auth: {
            login: {
                text: "login",
                url: "/login",
            },
            signup: {
                text: "register",
                url: "/register",
            },
        }
    }
    return (
        <Navbar1 {...Data} />
    )
}