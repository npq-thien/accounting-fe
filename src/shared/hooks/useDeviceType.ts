import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";

export const useDeviceType = () => {
    const theme = useMantineTheme();

    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const isTablet = useMediaQuery(
        `(min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.lg})`
    );
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

    return {
        isMobile,
        isTablet,
        isDesktop,
        isMobileOrTablet: isMobile || isTablet,
        isNotMobile: !isMobile,
    };
};
