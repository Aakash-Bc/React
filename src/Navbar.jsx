import { Link } from "react-router-dom"
import { useState } from "react"
import { Burger, Drawer, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

function Navbar() {
    const [opened, { toggle, close }] = useDisclosure(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "products", label: "Products" },
        { to: "news", label: "News" },
        { to: "users", label: "Users" },
        { to: "todolist", label: "TodoList" },
        { to: "userData", label: "UserData" },
        { to: "BlogPage", label: "Blog" },
        { to: "data", label: "Data" },
        { to: "/backend", label: "Backend Blog" },
        { to: "/admin", label: "Admin" },
        { to: "contact", label: "Contact" },
    ];

    return (
        <>
            <div className="flex justify-between items-center px-6 md:px-16 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-slate-100">
                
                <div>
                    <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter uppercase bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Logo
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.to} 
                            to={link.to} 
                            className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-all hover:-translate-y-0.5"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Burger */}
                <div className="lg:hidden">
                    <Burger opened={opened} onClick={toggle} size="sm" />
                </div>

                {/* Mobile Drawer */}
                <Drawer
                    opened={opened}
                    onClose={close}
                    title={
                        <Text fw={900} variant="gradient" gradient={{ from: 'blue', to: 'indigo' }}>
                            NAVIGATION
                        </Text>
                    }
                    padding="xl"
                    size="75%"
                >
                    <Stack gap="md">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.to} 
                                to={link.to} 
                                onClick={close}
                                className="text-slate-700 hover:text-blue-600 font-bold text-lg p-3 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Stack>
                </Drawer>

                <div className="hidden lg:flex gap-4">
                    {/* Placeholder for future buttons */}
                </div>
            </div>
        </>
    )
}

export default Navbar