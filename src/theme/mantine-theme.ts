import { type MantineColorsTuple, type MantineThemeOverride } from "@mantine/core";
// import { COLORS } from './tokens/colors';
// import { SPACING } from './tokens/spacing';
// import { TYPOGRAPHY } from './tokens/typography';

// Default colors: https://yeun.github.io/open-color/
const colors: Record<string, MantineColorsTuple> = {
    primary: [
        "#ebebfe",
        "#d2d2f9",
        "#a0a0f5",
        "#6d6cf2",
        "#4440f0",
        "#2d25f0",
        "#2318f0",
        "#1a0fd6",
        "#130cbf",
        "#03045f"
    ],
    secondary: [
        "#ffeee4",
        "#ffdcce",
        "#fcb89f",
        "#f8926b",
        "#f57240",
        "#f35a20",
        "#f35214",
        "#d94208",
        "#c23904",
        "#a92e00"
    ],
    red: [
        "#ffe9f2",
        "#ffd1e0",
        "#faa1bd",
        "#f66e99",
        "#f2437a",
        "#f02866",
        "#f0185c",
        "#d6084c",
        "#c00043",
        "#a90039",
    ],
};


export const theme: MantineThemeOverride = {
    colors: colors as Record<string, MantineColorsTuple>,
    primaryColor: "primary",
    // TODO: This font not loaded bold correctly. Have to import through html
    // fontFamily: "Noto Sans, sans-serif",
    spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "40px",
    },
    breakpoints: {
        xs: "30em",
        sm: "48em",
        md: "64em",
        lg: "74em",
        xl: "90em",
    },
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
    },

    defaultRadius: "sm",

    components: {
        Button: {
            defaultProps: {
                radius: "sm",
            },
        },
        TextInput: {
            defaultProps: {
                radius: "sm",
            },
        },
        // TextInput: {
        //     defaultProps: {
        //         size: "sm",
        //         label: {
        //             fontWeight: 500, // Make labels bold
        //         },
        //     },
        //     styles: {
        //         label: {
        //             fontWeight: 500, // Make labels bold
        //         },
        //     },
        // },
    },
};
