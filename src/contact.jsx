import { useForm } from '@mantine/form';
import { ActionIcon, NumberInput, TextInput, Button, Paper, Title, Container, Text, Select } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

function Contact() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { name: '', email: '', age: 0, category: null },

        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) =>
                (value.length < 3 || !/^[A-Za-z]+$/.test(value))
                    ? "Name must have at least 3 characters and contain only letters"
                    : null,
            email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address'),
            age: (value) => (value < 18 ? 'You must be at least 18 years old' : null),
            category: (value) => (value !== null ? null : 'Please select a category'),
        },
    });

    return (
        <Container size={420} my={60} className="font-sans">
            <Title ta="center" className="text-3xl font-black text-slate-800 tracking-tight uppercase bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Contact Us
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
                Fill out the form below and we will get back to you!
            </Text>

            <Paper withBorder shadow="sm" p={30} radius="xl" className="border-slate-100 bg-white shadow-xl">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        label="Name"
                        placeholder="Your name"
                        size="md"
                        radius="md"
                        classNames={{ label: 'text-sm font-semibold text-slate-700 mb-1' }}
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        mt="md"
                        label="Email"
                        placeholder="you@example.com"
                        size="md"
                        radius="md"
                        classNames={{ label: 'text-sm font-semibold text-slate-700 mb-1' }}
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <NumberInput
                        mt="md"
                        label="Age"
                        placeholder="Your age"
                        size="md"
                        radius="md"
                        min={0}
                        max={99}
                        classNames={{ label: 'text-sm font-semibold text-slate-700 mb-1' }}
                        key={form.key('age')}
                        {...form.getInputProps('age')}
                    />
                    <Select
                        mt="md"
                        label="Category"
                        placeholder="Choose a framework"
                        data={['React', 'Angular', 'Vue', 'HTML', 'Svelte']}
                        size="md"
                        radius="md"
                        classNames={{ label: 'text-sm font-semibold text-slate-700 mb-1' }}
                        key={form.key('category')}
                        {...form.getInputProps('category')}
                    />
                    <div className="flex items-center gap-4 mt-8">
                        <Button
                            type="submit"
                            fullWidth
                            size="md"
                            radius="md"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-md flex-1"
                        >
                            Send Message
                        </Button>
                        <ActionIcon
                            variant="gradient"
                            size="xl"
                            radius="md"
                            aria-label="Gradient action icon"
                            gradient={{ from: 'blue', to: 'indigo', deg: 90 }}
                            className="shadow-md h-[42px] w-[42px]"
                        >
                            <IconHeart size={20} />
                        </ActionIcon>
                    </div>
                </form>
            </Paper>
        </Container>
    );
}

export default Contact;
