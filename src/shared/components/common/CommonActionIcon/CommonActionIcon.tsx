import { ICON_SIZE } from "@/styles/commonStyles";
import { ActionIcon, type ActionIconProps } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export type CommonActionIconProps = ButtonProps &
    ActionIconProps & {
        icon: Icon;
    };

export const CommonActionIcon = ({ icon: IconComponent, ...rest }: CommonActionIconProps) => {
    return (
        <ActionIcon size="lg" variant="subtle" {...rest}>
            <IconComponent size={ICON_SIZE} stroke={2} />
        </ActionIcon>
    );
};
