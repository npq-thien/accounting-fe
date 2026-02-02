import { NavLink, Tooltip } from "@mantine/core";
import { CommonButton, CommonIcon } from "../components";
import type { MenuItem } from "../constants/menu";
import { BORDER_RADIUS_MENU_NAVBAR } from "@/styles/commonStyles";
import { ICON_MAP } from "../constants/icons";

type MenuItemProps = {
    item: MenuItem;
    isMobile: boolean;
    navbarCollapsed: boolean;
    isActive: boolean;
    onClick: () => void;
    isExpanded: boolean;
};

function MenuItemRenderer({
    item,
    isMobile,
    navbarCollapsed,
    isActive,
    onClick,
    isExpanded,
}: MenuItemProps) {
    const icon = <CommonIcon icon={item.icon ?? ICON_MAP.defaultMenuIcon} />;

    // MOBILE → always full NavLink
    if (isMobile) {
        return (
            <NavLink
                label={item.title}
                leftSection={icon}
                active={isActive}
                onClick={onClick}
                style={{
                    borderRadius: BORDER_RADIUS_MENU_NAVBAR,
                }}
            />
        );
    }

    // DESKTOP COLLAPSED → icon only
    if (navbarCollapsed) {
        return (
            <Tooltip label={item.title} position="right">
                <CommonButton
                    variant={isActive ? "light" : "subtle"}
                    w="100%"
                    h={40}
                    onClick={onClick}
                    style={{ justifyContent: "center" }}>
                    {icon}
                </CommonButton>
            </Tooltip>
        );
    }

    // DESKTOP EXPANDED → full NavLink
    return (
        <NavLink
            label={item.title}
            leftSection={icon}
            rightSection={
                item.children && (
                    <CommonIcon icon={isExpanded ? ICON_MAP.chevronDown : ICON_MAP.chevronRight} />
                )
            }
            active={isActive}
            onClick={onClick}
            style={{
                borderRadius: BORDER_RADIUS_MENU_NAVBAR,
                padding: "8px",
            }}
        />
    );
}

// function ChildMenuItemRenderer(props: MenuItemProps) {
//   return (
//     <MenuItemRenderer
//       {...props}
//     />
//   );
// }

export default MenuItemRenderer;
