import {
    FormCheckbox,
    FormDateInput,
    FormSelect,
    FormTextInput,
    FormTextarea,
} from "@/shared/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Accordion,
    Box,
    Button,
    Divider,
    Fieldset,
    Group,
    NumberInput,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { Form, FormProvider, useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Example 1: Simple Contact Form Schema
const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactFormSchema>;

// Example 2: Product Form Schema
const productFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be positive"),
    category: z.enum(["electronics", "clothing", "books", "home"], {
        required_error: "Please select a category",
    }),
    inStock: z.boolean(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
});

type ProductForm = z.infer<typeof productFormSchema>;

// Example 3: User Registration Schema
const registrationFormSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            ),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain uppercase, lowercase, and number"
            ),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
        newsletter: z.boolean().default(false),
        birthDate: z.date({
            required_error: "Birth date is required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type RegistrationForm = z.infer<typeof registrationFormSchema>;

// Example 4: Survey Form Schema
const surveyFormSchema = z.object({
    satisfaction: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Please rate your satisfaction",
    }),
    favoriteFeatures: z.array(z.string()).min(1, "Please select at least one feature"),
    comments: z.string().optional(),
    contactMe: z.boolean().default(false),
});

type SurveyForm = z.infer<typeof surveyFormSchema>;

// Example 5: Dynamic Todo List Schema
const todoItemSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]),
    completed: z.boolean().default(false),
    dueDate: z.date().optional(),
});

const todoFormSchema = z.object({
    todos: z.array(todoItemSchema).min(1, "At least one todo is required"),
});

type TodoForm = z.infer<typeof todoFormSchema>;

// Default values
const defaultContactForm: ContactForm = {
    name: "",
    email: "",
    message: "",
};

const defaultProductForm: ProductForm = {
    title: "",
    description: "",
    price: 0,
    category: "electronics",
    inStock: true,
    tags: [""],
};

const defaultRegistrationForm: RegistrationForm = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: false,
    birthDate: new Date(),
};

const defaultSurveyForm: SurveyForm = {
    satisfaction: "3",
    favoriteFeatures: [],
    comments: "",
    contactMe: false,
};

const defaultTodoForm: TodoForm = {
    todos: [
        {
            title: "",
            description: "",
            priority: "medium",
            completed: false,
            dueDate: undefined,
        },
    ],
};

export function AdvancedFormSample() {
    return (
        <Box p="md">
            <Title order={2} mb="lg">
                Advanced Form Samples
            </Title>
            <Text c="dimmed" mb="xl">
                This page demonstrates various form patterns using React Hook Form, Zod validation,
                and Mantine components.
            </Text>

            <Accordion variant="separated" defaultValue="contact">
                <Accordion.Item value="contact">
                    <Accordion.Control>
                        <Title order={4}>1. Simple Contact Form</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ContactFormExample />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="product">
                    <Accordion.Control>
                        <Title order={4}>2. Product Form with Array Fields</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ProductFormExample />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="registration">
                    <Accordion.Control>
                        <Title order={4}>3. User Registration with Validation</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <RegistrationFormExample />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="survey">
                    <Accordion.Control>
                        <Title order={4}>4. Survey Form with Multiple Choices</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <SurveyFormExample />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="todo">
                    <Accordion.Control>
                        <Title order={4}>5. Dynamic Todo List (useFieldArray)</Title>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <TodoFormExample />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
}
// Example 1: Simple Contact Form
function ContactFormExample() {
    const methods = useForm<ContactForm>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: defaultContactForm,
    });

    const onSubmit: SubmitHandler<ContactForm> = (data) => {
        toast.success("Contact form submitted!");
        console.log("Contact Form Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Fieldset legend="Contact Information">
                    <Stack>
                        <FormTextInput
                            name="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            withAsterisk
                        />

                        <FormTextInput
                            name="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            withAsterisk
                        />

                        <FormTextarea
                            name="message"
                            label="Message"
                            placeholder="Tell us what's on your mind..."
                            withAsterisk
                            minRows={4}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={methods.formState.isSubmitting}>
                                Send Message
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </Form>
        </FormProvider>
    );
}

// Example 2: Product Form with Array Tags
function ProductFormExample() {
    const methods = useForm<ProductForm>({
        resolver: zodResolver(productFormSchema),
        defaultValues: defaultProductForm,
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "tags",
    });

    const onSubmit: SubmitHandler<ProductForm> = (data) => {
        toast.success("Product created successfully!");
        console.log("Product Form Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Fieldset legend="Product Information">
                    <Stack>
                        <FormTextInput
                            name="title"
                            label="Product Title"
                            placeholder="Enter product title"
                            withAsterisk
                        />

                        <FormTextarea
                            name="description"
                            label="Description"
                            placeholder="Describe your product"
                            withAsterisk
                            minRows={3}
                        />

                        <Group grow>
                            <NumberInput
                                label="Price"
                                placeholder="0"
                                min={0}
                                {...methods.register("price", { valueAsNumber: true })}
                                error={methods.formState.errors.price?.message}
                            />

                            <FormSelect
                                name="category"
                                label="Category"
                                placeholder="Select category"
                                data={[
                                    { value: "electronics", label: "Electronics" },
                                    { value: "clothing", label: "Clothing" },
                                    { value: "books", label: "Books" },
                                    { value: "home", label: "Home & Garden" },
                                ]}
                                withAsterisk
                            />
                        </Group>

                        <FormCheckbox name="inStock" label="Available in stock" />

                        <Divider label="Product Tags" />

                        <Stack gap="xs">
                            {fields.map((field, index) => (
                                <Group key={field.id} grow>
                                    <FormTextInput
                                        name={`tags.${index}`}
                                        placeholder={`Tag ${index + 1}`}
                                        size="sm"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        color="red"
                                        size="sm"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}>
                                        Remove
                                    </Button>
                                </Group>
                            ))}
                        </Stack>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append("")}
                            size="sm">
                            Add Tag
                        </Button>

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={methods.formState.isSubmitting}>
                                Create Product
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </Form>
        </FormProvider>
    );
}

// Example 3: User Registration Form
function RegistrationFormExample() {
    const methods = useForm<RegistrationForm>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: defaultRegistrationForm,
    });

    const onSubmit: SubmitHandler<RegistrationForm> = (data) => {
        toast.success("Registration successful!");
        console.log("Registration Form Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Fieldset legend="Account Information">
                    <Stack>
                        <FormTextInput
                            name="username"
                            label="Username"
                            placeholder="Choose a username"
                            withAsterisk
                        />

                        <FormTextInput
                            name="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            withAsterisk
                        />

                        <Group grow>
                            <FormTextInput
                                name="password"
                                label="Password"
                                placeholder="Create a password"
                                type="password"
                                withAsterisk
                            />

                            <FormTextInput
                                name="confirmPassword"
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                type="password"
                                withAsterisk
                            />
                        </Group>

                        <FormDateInput
                            name="birthDate"
                            label="Date of Birth"
                            placeholder="Select your birth date"
                            withAsterisk
                        />

                        <FormCheckbox
                            name="acceptTerms"
                            label="I accept the terms and conditions"
                        />

                        <FormCheckbox name="newsletter" label="Subscribe to newsletter" />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={methods.formState.isSubmitting}>
                                Register Account
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </Form>
        </FormProvider>
    );
}

// Example 4: Survey Form
function SurveyFormExample() {
    const methods = useForm<SurveyForm>({
        resolver: zodResolver(surveyFormSchema),
        defaultValues: defaultSurveyForm,
    });

    const { watch, setValue } = methods;
    const selectedFeatures = watch("favoriteFeatures");

    const featureOptions = [
        { value: "ui", label: "User Interface" },
        { value: "performance", label: "Performance" },
        { value: "features", label: "Features" },
        { value: "support", label: "Customer Support" },
        { value: "pricing", label: "Pricing" },
    ];

    const toggleFeature = (value: string) => {
        const current = selectedFeatures || [];
        if (current.includes(value)) {
            setValue(
                "favoriteFeatures",
                current.filter((f) => f !== value)
            );
        } else {
            setValue("favoriteFeatures", [...current, value]);
        }
    };

    const onSubmit: SubmitHandler<SurveyForm> = (data) => {
        toast.success("Survey submitted!");
        console.log("Survey Form Data:", data);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Fieldset legend="Customer Satisfaction Survey">
                    <Stack>
                        <FormSelect
                            name="satisfaction"
                            label="How satisfied are you with our service?"
                            placeholder="Select rating"
                            data={[
                                { value: "1", label: "Very Dissatisfied (1)" },
                                { value: "2", label: "Dissatisfied (2)" },
                                { value: "3", label: "Neutral (3)" },
                                { value: "4", label: "Satisfied (4)" },
                                { value: "5", label: "Very Satisfied (5)" },
                            ]}
                            withAsterisk
                        />

                        <div>
                            <Text size="sm" fw={500} mb="xs">
                                Which features do you like most? (Select all that apply)
                            </Text>
                            <Group>
                                {featureOptions.map((option) => (
                                    <Button
                                        key={option.value}
                                        type="button"
                                        variant={
                                            selectedFeatures?.includes(option.value)
                                                ? "filled"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() => toggleFeature(option.value)}>
                                        {option.label}
                                    </Button>
                                ))}
                            </Group>
                            {methods.formState.errors.favoriteFeatures && (
                                <Text size="xs" c="red" mt="xs">
                                    {methods.formState.errors.favoriteFeatures.message}
                                </Text>
                            )}
                        </div>

                        <FormTextarea
                            name="comments"
                            label="Additional Comments (Optional)"
                            placeholder="Any suggestions or feedback?"
                            minRows={3}
                        />

                        <FormCheckbox name="contactMe" label="Contact me for follow-up" />

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" loading={methods.formState.isSubmitting}>
                                Submit Survey
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </Form>
        </FormProvider>
    );
}

// Example 5: Dynamic Todo List
function TodoFormExample() {
    const methods = useForm<TodoForm>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: defaultTodoForm,
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "todos",
    });

    const onSubmit: SubmitHandler<TodoForm> = (data) => {
        toast.success("Todo list saved!");
        console.log("Todo Form Data:", data);
    };

    const addTodo = () => {
        append({
            title: "",
            description: "",
            priority: "medium",
            completed: false,
            dueDate: undefined,
        });
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <Fieldset legend="Todo List Manager">
                    <Stack>
                        {fields.map((field, index) => (
                            <Fieldset key={field.id} legend={`Todo ${index + 1}`}>
                                <Stack>
                                    <Group grow>
                                        <FormTextInput
                                            name={`todos.${index}.title`}
                                            label="Title"
                                            placeholder="What needs to be done?"
                                            withAsterisk
                                        />

                                        <FormSelect
                                            name={`todos.${index}.priority`}
                                            label="Priority"
                                            placeholder="Select priority"
                                            data={[
                                                { value: "low", label: "Low" },
                                                { value: "medium", label: "Medium" },
                                                { value: "high", label: "High" },
                                            ]}
                                        />
                                    </Group>

                                    <FormTextarea
                                        name={`todos.${index}.description`}
                                        label="Description (Optional)"
                                        placeholder="Additional details..."
                                        minRows={2}
                                    />

                                    <Group grow>
                                        <FormDateInput
                                            name={`todos.${index}.dueDate`}
                                            label="Due Date (Optional)"
                                            placeholder="Select due date"
                                        />

                                        <FormCheckbox
                                            name={`todos.${index}.completed`}
                                            label="Mark as completed"
                                        />
                                    </Group>

                                    <Group justify="flex-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            color="red"
                                            size="sm"
                                            onClick={() => remove(index)}
                                            disabled={fields.length === 1}>
                                            Remove Todo
                                        </Button>
                                    </Group>
                                </Stack>
                            </Fieldset>
                        ))}

                        <Group justify="space-between" mt="md">
                            <Button type="button" variant="outline" onClick={addTodo}>
                                Add Todo
                            </Button>

                            <Button type="submit" loading={methods.formState.isSubmitting}>
                                Save Todo List
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </Form>
        </FormProvider>
    );
}

