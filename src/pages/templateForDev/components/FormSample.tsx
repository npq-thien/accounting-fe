import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Fieldset, Grid, Group, Stack, Title } from "@mantine/core";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import { SimpleFormSchema } from "../schema";

import type { SimpleForm } from "../type";

import { notify } from "@/app/toast/toast";
import {
    CommonButton,
    CommonIcon,
    CommonTextInput,
    FormDateInput,
    FormSelect,
    FormTextInput,
    loader
} from "@/shared/components/common";
import { ICON_MAP } from "@/shared/constants/icons";

const defaultSimpleForm: SimpleForm = {
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
};

export const FormSample = () => {
    const methods = useForm<SimpleForm>({
        defaultValues: defaultSimpleForm,
        resolver: zodResolver(SimpleFormSchema),
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
        <Box>
            <Title order={2} mb="lg">
                Simple Form Sample
            </Title>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset legend="Basic Information">
                        <Stack gap="sm">
                            <CommonTextInput label="Your name" placeholder="Your name" />
                            <FormTextInput
                                name="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                leftSection={<CommonIcon icon={ICON_MAP.home} />}
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

                            <Grid>
                                <Grid.Col span={6}>
                                    <FormDateInput
                                        name="dateOfBirth"
                                        label="Date of Birth"
                                        placeholder="Select your date of birth"
                                        withAsterisk
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <FormSelect
                                        name="gender"
                                        label="Gender"
                                        placeholder="Select your gender"
                                        data={[
                                            { value: "male", label: "Male" },
                                            { value: "female", label: "Female" },
                                            { value: "other", label: "Other" },
                                        ]}
                                        withAsterisk
                                    />
                                </Grid.Col>
                            </Grid>
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
