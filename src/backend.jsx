import { useState, useEffect } from "react";
import api from "./api/api";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Textarea,
  Switch,
  Button,
  Group,
  Box,
  Paper,
  Title,
  Stack,
  LoadingOverlay,
  Divider,
  Container
} from "@mantine/core";
import { useForm } from "@mantine/form";

function Backend() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // View state for Add Blog Form
  const [isAdding, setIsAdding] = useState(false);
  const [formIsLoading, setFormIsLoading] = useState(false);

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

  const handleFormSubmit = async (values) => {
      setFormIsLoading(true);
      try {
          await api.post("create", values);
          alert("✨ Blog added successfully!");
          form.reset();
          setIsAdding(false);
          fetchBlogs();
      } catch (error) {
          console.error(error);
          alert("❌ Operation failed.");
      } finally {
          setFormIsLoading(false);
      }
  };

  // GET BLOGS
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await api.get("blogs");
      // Only show active blogs
      setBlogs(res.data.filter(blog => blog.status === true));
    } catch (error) {
      console.error(error);
      setError("Failed to connect to the backend server. Make sure your backend is running!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 flex flex-col items-center min-h-[80vh]">

      {/* Header */}
      <div className="space-y-4 text-center w-full max-w-2xl mb-12 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Backend <span className="text-blue-600">Blogs</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Explore the latest stories and updates from our internal team.
        </p>
        {!isAdding && (
            <Button mt="md" size="md" radius="xl" color="blue" variant="light" onClick={() => setIsAdding(true)}>
                + Add New Blog
            </Button>
        )}
      </div>

      {/* Blog List - Grid View ONLY */}
      <div className="w-full max-w-6xl">
        {isAdding ? (
            <Container size="sm" p={0} className="w-full">
                <Paper shadow="2xl" radius="3xl" withBorder p={40}>
                    <Box pos="relative">
                        <LoadingOverlay visible={formIsLoading} zIndex={1000} overlayProps={{ blur: 1 }} />

                        <Group justify="space-between" mb={30}>
                            <Title order={2} className="text-slate-800">
                                New Post
                            </Title>
                            <Button variant="subtle" color="gray" size="xs" onClick={() => setIsAdding(false)}>
                                Cancel
                            </Button>
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
                                    Publish Now
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Paper>
            </Container>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-200">
            <p className="text-red-500 font-extrabold text-xl mb-3">Connection Error</p>
            <p className="text-red-400 text-sm max-w-md mx-auto">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="bg-white p-6 rounded-2xl border shadow-lg cursor-pointer h-[450px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                    alt=""
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 transition-all line-clamp-1 group-hover:text-blue-600">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mt-2 flex-1 line-clamp-4 leading-relaxed">
                  {blog.description}
                </p>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Published Reader View
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:mr-2 transition-all">
                    Read Full Story →
                  </span>
                </div>
              </div>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-3 text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Awaiting first system initialization</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Backend;