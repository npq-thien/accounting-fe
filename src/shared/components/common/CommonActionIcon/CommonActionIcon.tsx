import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, type ActionIconProps } from "@mantine/core";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export type CommonActionIconProps = ButtonProps & ActionIconProps & {
    icon: IconDefinition;
}

export const CommonActionIcon = ({ icon, ...rest }: CommonActionIconProps) => {
    return (
        <ActionIcon size="lg" variant="subtle" {...rest}>
            <FontAwesomeIcon icon={icon} />
        </ActionIcon>
    );
};