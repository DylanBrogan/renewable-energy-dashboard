import React, { useState } from 'react'
import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Link,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react'
import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell
} from "react-icons/fi"
import MyChart from '../components/MyChart'

export default function Dashboard() {
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)
    return (
        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
        >
            {/* Column 1 */}
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                backgroundColor="#020202"
                color="#fff"
            >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl",]}
                            alignSelf="center"
                            letterSpacing="tight"
                        >
                            RED
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                </Link>
                                <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Live Data</Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Column 2 */}
            <Flex
                w={["100%", "100%", "85%", "85%", "85%"]}
                p="3%"
                flexDir="column"
                overflow="auto"
                minH="100vh"
            >
                <Heading
                    fontWeight="bold"
                    mb={4}
                    letterSpacing="tight"
                >
                    Renewable Energy Dashboard
                </Heading>
                <Flex
                    flexDir={"row"}         // Stack items vertically on small screens, horizontally on larger screens
                    wrap="wrap"                         // Allow items to wrap to the next line if needed
                    align="center"                      // Center align items
                    gap={4}                             // Add space between items
                >
                    <Flex
                        flexDir="column"
                        align="center"
                        flex="1"
                        maxW="100%"                        // Ensure it does not exceed its parent width
                    >
                        <Text color="gray" fontSize="lg">Solar</Text>
                        <MyChart />
                    </Flex>
                    <Flex
                        flexDir="column"
                        align="center"
                        flex="1"
                        maxW="100%"                        // Ensure it does not exceed its parent width
                    >
                        <Text color="gray" fontSize="lg">Hydro</Text>
                        <MyChart />
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}