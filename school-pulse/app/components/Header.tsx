"use client";
import { Navbar1 } from "@/components/blocks/shadcnblocks-com-navbar1";
import { useUser } from "@stackframe/stack";

export function Header() {
    const user = useUser();

    const Data = {
        menu: [
            { title: "Home", url: "/" },
            { title: "About", url: "/about" },
            { title: "Contact", url: "/contact" },
        ],
        auth: user
            ? undefined
            : {
                  login: {
                      text: "login",
                      url: "/handler/sign-in",
                  },
                  signup: {
                      text: "register",
                      url: "/handler/sign-up",
                  },
              },
        user,
    };

    return <Navbar1 {...Data} />;
}