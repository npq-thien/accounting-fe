import { notify } from "@/app/toast/toast";
import {
    CommonButton,
    FormAutocomplete,
    FormDateInput,
    FormTextInput,
    loader,
} from "@/shared/components/common";
import { Box, Divider, Fieldset, Group, Stack, Title } from "@mantine/core";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { SimpleForm } from "../types";

const defaultSimpleForm: SimpleForm = {
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
};

export const FormSample = () => {
    const methods = useForm<SimpleForm>({
        defaultValues: defaultSimpleForm,
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit: SubmitHandler<SimpleForm> = async (data) => {
        try {
            loader.show();
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log("Form data:", data);
            notify.success("Success", "Form submitted successfully!");
        } catch (error) {
            notify.error("Error", "Failed to submit form");
            console.error("Form submission error:", error);
        } finally {
            loader.hide();
        }
    };

    return (
        <Box p="md" maw={600} mx="auto">
            <Title order={2} mb="lg">
                Simple Form Sample
            </Title>

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset legend="Basic Information">
                        <Stack gap="sm">
                            <FormTextInput
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                withAsterisk
                            />
                            <FormTextInput
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                withAsterisk
                            />
                            <Divider />

                            <FormDateInput
                                name="dateOfBirth"
                                label="Date of Birth"
                                placeholder="Select your date of birth"
                                withAsterisk
                            />

                            <FormAutocomplete
                                name="gender"
                                label="Gender"
                                placeholder="Select your gender"
                                data={["Male", "Female", "Other"]}
                            />
                            <FormTextInput
                                name="phone"
                                label="Phone Number (Optional)"
                                placeholder="Enter your phone number"
                            />
                            <Group justify="flex-end" mt="md">
                                <CommonButton type="submit" loading={isSubmitting}>
                                    {isSubmitting ? "Submitting..." : "Submit Form"}
                                </CommonButton>
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
                style={{ border: "1px solid #e9ecef", borderRadius: "4px" }}>
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
