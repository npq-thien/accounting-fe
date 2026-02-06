import { useMantineColorScheme } from "@mantine/core";
import type { ITooltipParams } from "ag-grid-community";

export function ValidationTooltip(props: ITooltipParams) {
    const { colorScheme } = useMantineColorScheme();
    
    if (!props.value) return null;

    return (
        <div
            className="ag-cell-invalid-tooltip"
            data-ag-theme={colorScheme === "dark" ? "dark" : "light"}>
            {props.value}
        </div>
    );
}
