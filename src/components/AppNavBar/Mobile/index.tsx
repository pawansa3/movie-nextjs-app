import { NAV_ITEMS } from "@/utils/navItems";
import {
  Flex,
  Text,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import NextLink from "next/link";
import Searchbar from "../../SearchBar";
import { NavItem } from "@/utils/interface";

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {/* <Searchbar /> */}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4}>
      <NextLink href={href || "#"} passHref={false}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Flex>
      </NextLink>
    </Stack>
  );
};

export default MobileNav;
