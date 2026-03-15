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
    Tabs,
    Container,
    Image,
    ScrollArea,
    Divider
} from "@mantine/core";
import { useForm } from "@mantine/form";

const AdminPanel = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("manage");
    const [editingId, setEditingId] = useState(null);

    // Mantine Form for Validation
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            status: true,
        },
        validate: {
            title: (value) => (value.length < 5 ? "Title must have at least 5 characters" : null),
            description: (value) => (value.length < 10 ? "Description must have at least 10 characters" : null),
        },
    });

    // GET BLOGS
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/blogs");
            setBlogs(res.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (values) => {
        setIsLoading(true);
        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/update/${editingId}`, values);
                alert("✏️ Blog updated successfully!");
                setEditingId(null);
                setActiveTab("manage");
            } else {
                await axios.post("http://localhost:8000/api/create", values);
                alert("✨ Blog added successfully!");
            }
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
            await axios.delete(`http://localhost:8000/api/delete/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const editBlog = (blog) => {
        setEditingId(blog._id);
        form.setValues({
            title: blog.title,
            description: blog.description,
            status: blog.status,
        });
        setActiveTab("add");
    };

    const cancelEdit = () => {
        setEditingId(null);
        form.reset();
        setActiveTab("manage");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar - Kept the themed look but simplified */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-8">
                    <Title order={3} className="tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        ADMIN HUB
                    </Title>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab("manage")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "manage" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}
                    >
                        <span>📋</span> Manage Blogs
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("add");
                            setEditingId(null);
                            form.reset();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "add" && !editingId ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"}`}
                    >
                        <span>➕</span> Add New Blog
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800 text-center text-xs text-slate-500">
                    v1.1.0 Mantine Edition
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto relative">
                <LoadingOverlay visible={isLoading && activeTab === 'manage'} zIndex={1000} overlayProps={{ blur: 2 }} />

                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <Title order={1} className="text-slate-800 font-black">
                            {activeTab === "manage" ? "Manage Content" : editingId ? "Edit Post" : "Create Post"}
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
                                    {blogs.map((blog) => (
                                        <Table.Tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                                            <Table.Td>
                                                <Group gap="sm">
                                                    <Image
                                                        src={blog.img || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=200&auto=format&fit=crop"}
                                                        w={64}
                                                        h={64}
                                                        radius="md"
                                                        fallbackSrc="https://placehold.co/200x200?text=Blog"
                                                    />
                                                    <div>
                                                        <Text size="sm" fw={700} className="text-slate-800 line-clamp-1">{blog.title}</Text>
                                                        <Text size="xs" c="dimmed" className="line-clamp-1">{blog.description}</Text>
                                                    </div>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td align="center">
                                                <Badge
                                                    color={blog.status ? "teal" : "gray"}
                                                    variant="light"
                                                    radius="sm"
                                                    size="sm"
                                                >
                                                    {blog.status ? "Published" : "Draft"}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td align="right">
                                                <Group justify="flex-end" gap={8}>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="blue"
                                                        size="lg"
                                                        onClick={() => editBlog(blog)}
                                                        radius="md"
                                                    >
                                                        <span>✏️</span>
                                                    </ActionIcon>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="red"
                                                        size="lg"
                                                        onClick={() => deleteBlog(blog._id)}
                                                        radius="md"
                                                    >
                                                        <span>🗑️</span>
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                    {blogs.length === 0 && !isLoading && (
                                        <Table.Tr>
                                            <Table.Td colSpan={3} py={60} ta="center">
                                                <Text c="dimmed" fs="italic">No blogs found. Start by adding one!</Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    )}
                                </Table.Tbody>
                            </Table>
                        </ScrollArea>
                    </Paper>
                ) : (
                    <Container size="sm" p={0}>
                        <Paper shadow="2xl" radius="3xl" withBorder p={40}>
                            <Box pos="relative">
                                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ blur: 1 }} />

                                <Group justify="space-between" mb={30}>
                                    <Title order={2} className="text-slate-800">
                                        {editingId ? "Update Content" : "New Post"}
                                    </Title>
                                    {editingId && (
                                        <Button variant="subtle" color="gray" size="xs" onClick={cancelEdit}>
                                            Cancel Editing
                                        </Button>
                                    )}
                                </Group>

                                <form onSubmit={form.onSubmit(handleFormSubmit)}>
                                    <Stack gap="xl">
                                        <TextInput
                                            label="Post Title"
                                            placeholder="Enter a catchy headline"
                                            size="md"
                                            radius="md"
                                            withAsterisk
                                            {...form.getInputProps("title")}
                                            classNames={{ input: "bg-slate-50 border-slate-100" }}
                                        />

                                        <Textarea
                                            label="Description"
                                            placeholder="Tell your story..."
                                            size="md"
                                            radius="md"
                                            minRows={6}
                                            withAsterisk
                                            {...form.getInputProps("description")}
                                            classNames={{ input: "bg-slate-50 border-slate-100" }}
                                        />

                                        <Divider label="Publishing Options" labelPosition="center" />

                                        <Switch
                                            label="Published & Active"
                                            description="Check this to make the post visible to readers immediately."
                                            size="md"
                                            color="blue"
                                            {...form.getInputProps("status", { type: 'checkbox' })}
                                        />

                                        <Button
                                            type="submit"
                                            size="lg"
                                            radius="md"
                                            color="dark"
                                            fullWidth
                                            mt="md"
                                        >
                                            {editingId ? "Update Post" : "Publish Now"}
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
