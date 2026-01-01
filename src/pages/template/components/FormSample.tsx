import { FormTextInput } from "@/shared/components/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Fieldset,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Simple form schema for email, phone, and password
const simpleFormSchema = z.object({
    email: z.string()
        .email("Please enter a valid email address")
        .min(1, "Email is required"),

    phone: z.string()
        .regex(/^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/, "Please enter a valid Vietnamese phone number")
        .optional(),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .min(1, "Password is required"),
});

type SimpleForm = z.infer<typeof simpleFormSchema>;

// Default values
const defaultSimpleForm: SimpleForm = {
    email: "",
    phone: "",
    password: "",
};

export const FormSample = () => {
    const methods = useForm<SimpleForm>({
        resolver: zodResolver(simpleFormSchema),
        defaultValues: defaultSimpleForm,
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<SimpleForm> = async (data) => {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log("Form data:", data);
            toast.success("Form submitted successfully!");
        } catch (error) {
            toast.error("Failed to submit form");
            console.error("Form submission error:", error);
        }
    };

    return (
        <Box p="md" maw={600} mx="auto">
            <Title order={2} mb="lg">
                Simple Form Sample
            </Title>
            <Text c="dimmed" mb="xl">
                This form demonstrates basic validation for email, phone, and password fields.
            </Text>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset legend="Basic Information">
                        <Stack gap="md">
                            <FormTextInput
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                withAsterisk
                            />

                            <FormTextInput
                                name="phone"
                                label="Phone Number (Optional)"
                                placeholder="Enter your phone number"
                            />

                            <FormTextInput
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                withAsterisk
                            />

                            <Group justify="flex-end" mt="md">
                                <Button type="submit" loading={isSubmitting} size="lg">
                                    {isSubmitting ? "Submitting..." : "Submit Form"}
                                </Button>
                            </Group>
                        </Stack>
                    </Fieldset>
                </form>
            </FormProvider>

            {/* Debug Panel - Remove in production */}
            <Box
                mt="xl"
                p="md"
                bg="gray.0"
                style={{ border: "1px solid #e9ecef", borderRadius: "4px" }}
            >
                <Title order={5} mb="sm">
                    Debug: Form Errors
                </Title>
                <pre style={{ fontSize: "12px", overflow: "auto" }}>
                    {JSON.stringify(errors, null, 2)}
                </pre>
            </Box>
        </Box>
    );
};