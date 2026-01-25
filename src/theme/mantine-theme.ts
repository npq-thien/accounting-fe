import { virtualColor, type MantineColorsTuple, type MantineThemeOverride } from "@mantine/core";
// import { COLORS } from './tokens/colors';
// import { SPACING } from './tokens/spacing';
// import { TYPOGRAPHY } from './tokens/typography';

// Default colors: https://yeun.github.io/open-color/
const colors: Record<string, MantineColorsTuple> = {
    primary: virtualColor({
        name: "primary",
        dark: "cyan",
        light: "pink",
    }),
    deepBlue: [
        "#eef3ff",
        "#dce4f5",
        "#b9c7e2",
        "#94a8d0",
        "#748dc1",
        "#5f7cb8",
        "#5474b4",
        "#44639f",
        "#39588f",
        "#2d4b81",
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
    "bright-pink": [
        "#F0BBDD",
        "#ED9BCF",
        "#EC7CC3",
        "#ED5DB8",
        "#F13EAF",
        "#F71FA7",
        "#FF00A1",
        "#E00890",
        "#C50E82",
        "#AD1374",
    ],
};


export const theme: MantineThemeOverride = {
    colors: colors as Record<string, MantineColorsTuple>,
    // TODO: define primary color
    // primaryColor: "yellow",
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
