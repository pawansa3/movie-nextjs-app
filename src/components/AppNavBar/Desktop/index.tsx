import { Box, Stack, useColorModeValue, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Searchbar from "../../SearchBar";
import { NAV_ITEMS } from "@/utils/navItems";

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} p="2">
          <Link
            as={NextLink}
            href={navItem.href}
            passHref
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
