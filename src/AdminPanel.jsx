import { useState, useEffect } from "react";
import axios from "axios";
import {
    TextInput,
    Textarea,
    Switch,
    Button,
    Group,
    Box,
    Paper,
    Title,
    Text,
    Stack,
    LoadingOverlay,
    ActionIcon,
    Badge,
    Table,
    Container,
    Image,
    ScrollArea,
    Divider,
    PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const AdminPanel = () => {
    // Auth States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("manage");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    // Auth Form
    const authForm = useForm({
        initialValues: { email: "", password: "", name: "" },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 4 ? "Password must be at least 4 characters" : null),
        },
    });

    // Hardcoded credentials (no backend needed)
    const VALID_USER = {
        name: "aakash budha",
        email: "aakashbc24@gmail.com",
        password: "1234",
    };

    const handleAuthSubmit = async (values) => {
        setAuthLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        try {
            if (isLoginView) {
                if (
                    values.email.trim() === VALID_USER.email &&
                    values.password === VALID_USER.password
                ) {
                    setIsAuthenticated(true);
                } else {
                    alert("❌ Invalid email or password. Please try again.");
                }
            } else {
                // Name can be anything — only email & password must match
                if (
                    values.email.trim() === VALID_USER.email &&
                    values.password === VALID_USER.password
                ) {
                    setIsAuthenticated(true);
                } else {
                    alert("❌ Registration failed. Invalid email or password.");
                }
            }
        } finally {
            setAuthLoading(false);
        }
    };

    // Blog Form
    const form = useForm({
        initialValues: { title: "", description: "", status: true },
        validate: {
            title: (v) => (v.length < 5 ? "Title must have at least 5 characters" : null),
            description: (v) => (v.length < 10 ? "Description must have at least 10 characters" : null),
        },
    });

    useEffect(() => {
        if (isAuthenticated) fetchBlogs();
    }, [isAuthenticated]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get("http://localhost:5000/api");
            setBlogs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Cannot connect to backend server. Make sure your server is running!");
            setBlogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/update/${editingId}`, values);
            alert("✏️ Blog updated successfully!");
            setEditingId(null);
            setActiveTab("manage");
            form.reset();
            fetchBlogs();
        } catch (error) {
            console.error(error);
            alert("❌ Operation failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/delete/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const editBlog = (blog) => {
        setEditingId(blog._id);
        form.setValues({ title: blog.title, description: blog.description, status: blog.status });
        setActiveTab("add");
    };

    const cancelEdit = () => {
        setEditingId(null);
        form.reset();
        setActiveTab("manage");
    };

    // ─── LOGIN / REGISTER PAGE ───────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 50%, #ede9fe 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "'Inter', sans-serif",
                position: "relative",
                overflow: "hidden",
            }}>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                    @keyframes bgFloat { 0%,100%{transform:translateY(0px) scale(1)} 50%{transform:translateY(-20px) scale(1.04)} }
                    .auth-orb { position:absolute; border-radius:50%; filter:blur(60px); opacity:0.45; pointer-events:none; }
                    .auth-orb-1 { width:340px; height:340px; background:#a5b4fc; top:-80px; left:-80px; animation:bgFloat 8s ease-in-out infinite; }
                    .auth-orb-2 { width:280px; height:280px; background:#c4b5fd; bottom:-60px; right:-60px; animation:bgFloat 10s ease-in-out infinite 2s; }
                    .auth-orb-3 { width:200px; height:200px; background:#7dd3fc; bottom:20%; left:5%; animation:bgFloat 7s ease-in-out infinite 1s; }
                    .auth-grid { position:absolute; inset:0; background-image:radial-gradient(rgba(99,102,241,0.08) 1.5px, transparent 1.5px); background-size:30px 30px; pointer-events:none; }
                    .auth-tab { flex:1; padding:9px; border:none; background:transparent; font-size:14px; font-weight:600; color:#94a3b8; cursor:pointer; border-radius:8px; transition:all 0.2s; font-family:inherit; }
                    .auth-tab.active { background:#fff; color:#1e293b; box-shadow:0 1px 4px rgba(0,0,0,0.1); }
                    .auth-tab:hover:not(.active) { color:#64748b; }
                    .auth-btn { width:100%; padding:12px; background:#2563eb; color:#fff; border:none; border-radius:10px; font-size:15px; font-weight:600; cursor:pointer; transition:background 0.2s, transform 0.15s; margin-top:8px; font-family:inherit; letter-spacing:0.1px; }
                    .auth-btn:hover:not(:disabled) { background:#1d4ed8; transform:translateY(-1px); }
                    .auth-btn:disabled { opacity:0.65; cursor:not-allowed; }
                    .auth-link { color:#2563eb; font-weight:600; cursor:pointer; background:none; border:none; font-family:inherit; font-size:13px; padding:0; }
                    .auth-link:hover { text-decoration:underline; }
                `}</style>

                {/* Decorative background */}
                <div className="auth-orb auth-orb-1" />
                <div className="auth-orb auth-orb-2" />
                <div className="auth-orb auth-orb-3" />
                <div className="auth-grid" />

                {/* Logo mark */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: "linear-gradient(135deg, #2563eb, #6366f1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 22, margin: "0 auto 12px",
                        boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                    }}>⚙️</div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: -0.5 }}>
                        Admin Panel
                    </h1>
                    <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>
                        Sign in to manage your content
                    </p>
                </div>

                {/* Card */}
                <div style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: "32px 36px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                    border: "1px solid #e2e8f0",
                    width: "100%",
                    maxWidth: 420,
                }}>


                    {/* Sub-title */}
                    <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>
                        {isLoginView ? "Welcome back 👋" : "Create your account"}
                    </h2>
                    <p style={{ margin: "0 0 24px", fontSize: 13, color: "#94a3b8" }}>
                        {isLoginView ? "Enter your credentials below." : "Fill in the details to register."}
                    </p>

                    {/* Form */}
                    <form onSubmit={authForm.onSubmit(handleAuthSubmit)}>
                        <Stack gap="sm">
                            {!isLoginView && (
                                <TextInput
                                    label="Full Name"
                                    placeholder="e.g. Aakash Budha"
                                    size="md"
                                    radius="md"
                                    required
                                    {...authForm.getInputProps("name")}
                                />
                            )}
                            <TextInput
                                label="Email"
                                placeholder="you@example.com"
                                size="md"
                                radius="md"
                                required
                                {...authForm.getInputProps("email")}
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                size="md"
                                radius="md"
                                required
                                {...authForm.getInputProps("password")}
                            />
                        </Stack>

                        <button type="submit" className="auth-btn" disabled={authLoading} style={{ marginTop: 20 }}>
                            {authLoading ? "Please wait..." : isLoginView ? "Sign In" : "Create Account"}
                        </button>

                        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#94a3b8", margin: "16px 0 0" }}>
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <button className="auth-link" type="button" onClick={() => { setIsLoginView(!isLoginView); authForm.reset(); }}>
                                {isLoginView ? "Register" : "Sign In"}
                            </button>
                        </p>
                    </form>
                </div>

                {/* Demo hint */}
                <p style={{ marginTop: 20, fontSize: 12, color: "#cbd5e1", textAlign: "center" }}>
                    Demo credentials: <strong style={{ color: "#94a3b8" }}>aakashbc24@gmail.com</strong> / <strong style={{ color: "#94a3b8" }}>1234</strong>
                </p>
            </div>
        );
    }

    // ─── FULL ADMIN PANEL ────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-8">
                    <Title order={3} className="tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        ADMIN HUB
                    </Title>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab("manage"); setEditingId(null); form.reset(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            activeTab === "manage" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
                        }`}
                    >
                        <span>📋</span> Manage Blogs
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Group justify="space-between" align="center">
                        <Text size="xs" c="dimmed">v1.1.0</Text>
                        <Button variant="subtle" color="red" size="xs" onClick={() => { setIsAuthenticated(false); authForm.reset(); }}>
                            Logout
                        </Button>
                    </Group>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto relative">
                <LoadingOverlay visible={isLoading && activeTab === "manage"} zIndex={1000} overlayProps={{ blur: 2 }} />

                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <Title order={1} className="text-slate-800 font-black">
                            {activeTab === "manage" ? "Manage Content" : "Edit Post"}
                        </Title>
                        <Text c="dimmed" mt="xs">
                            Welcome back, Admin. Here's what's happening today.
                        </Text>
                    </div>
                    {activeTab === "manage" && (
                        <Badge size="xl" variant="light" color="blue" radius="md">
                            {blogs.length} Active Posts
                        </Badge>
                    )}
                </header>

                {activeTab === "manage" ? (
                    <Paper shadow="xs" radius="xl" withBorder p={0} className="overflow-hidden">
                        <ScrollArea>
                            <Table verticalSpacing="md" horizontalSpacing="xl">
                                <Table.Thead className="bg-slate-50">
                                    <Table.Tr>
                                        <Table.Th className="text-slate-400 uppercase tracking-widest text-[10px]">Blog Info</Table.Th>
                                        <Table.Th className="text-slate-400 uppercase tracking-widest text-[10px] text-center">Status</Table.Th>
                                        <Table.Th className="text-slate-400 uppercase tracking-widest text-[10px] text-right">Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {Array.isArray(blogs) && blogs.map((blog) => (
                                        <Table.Tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                                            <Table.Td>
                                                <Group gap="sm">
                                                    <Image
                                                        src={blog.img || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=200&auto=format&fit=crop"}
                                                        w={64} h={64} radius="md"
                                                        fallbackSrc="https://placehold.co/200x200?text=Blog"
                                                    />
                                                    <div>
                                                        <Text size="sm" fw={700} className="text-slate-800 line-clamp-1">{blog.title}</Text>
                                                        <Text size="xs" c="dimmed" className="line-clamp-1">{blog.description}</Text>
                                                    </div>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td align="center">
                                                <Badge color={blog.status ? "teal" : "gray"} variant="light" radius="sm" size="sm">
                                                    {blog.status ? "Published" : "Draft"}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td align="right">
                                                <Group justify="flex-end" gap={8}>
                                                    <ActionIcon variant="light" color="blue" size="lg" onClick={() => editBlog(blog)} radius="md">
                                                        <span>✏️</span>
                                                    </ActionIcon>
                                                    <ActionIcon variant="light" color="red" size="lg" onClick={() => deleteBlog(blog._id)} radius="md">
                                                        <span>🗑️</span>
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                    {(!Array.isArray(blogs) || blogs.length === 0) && !isLoading && (
                                        <Table.Tr>
                                            <Table.Td colSpan={3} py={60} ta="center">
                                                {error ? (
                                                    <div className="flex flex-col items-center">
                                                        <Text c="red" fw={700} mb={6}>⚠️ Connection Error</Text>
                                                        <Text c="dimmed" fs="italic">{error}</Text>
                                                    </div>
                                                ) : (
                                                    <Text c="dimmed" fs="italic">No blogs found.</Text>
                                                )}
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </ScrollArea>
                    </Paper>
                ) : (
                    <Container size="sm" p={0}>
                        <Paper shadow="md" radius="xl" withBorder p={40}>
                            <Box pos="relative">
                                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ blur: 1 }} />
                                <Group justify="space-between" mb={30}>
                                    <Title order={2} className="text-slate-800">Edit Post</Title>
                                    <Button variant="subtle" color="gray" size="xs" onClick={cancelEdit}>Cancel</Button>
                                </Group>
                                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                                    <Stack gap="xl">
                                        <TextInput
                                            label="Post Title"
                                            placeholder="Enter a catchy headline"
                                            size="md" radius="md" withAsterisk
                                            {...form.getInputProps("title")}
                                            classNames={{ input: "bg-slate-50 border-slate-100" }}
                                        />
                                        <Textarea
                                            label="Description"
                                            placeholder="Tell your story..."
                                            size="md" radius="md" minRows={6} withAsterisk
                                            {...form.getInputProps("description")}
                                            classNames={{ input: "bg-slate-50 border-slate-100" }}
                                        />
                                        <Divider label="Publishing Options" labelPosition="center" />
                                        <Switch
                                            label="Published & Active"
                                            description="Check this to make the post visible to readers immediately."
                                            size="md" color="blue"
                                            {...form.getInputProps("status", { type: "checkbox" })}
                                        />
                                        <Button type="submit" size="lg" radius="md" color="dark" fullWidth mt="md">
                                            Update Post
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Paper>
                    </Container>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
