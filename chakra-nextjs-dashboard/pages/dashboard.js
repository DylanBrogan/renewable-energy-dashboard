import React, { useState, useEffect} from 'react'
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
    //Use States
    const [display, changeDisplay] = useState('hide')
    const [value, changeValue] = useState(1)

    //Use Effects
    useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await fetch('/api/hello');
            const data = await response.json();
            console.log(data)
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        }
        
        fetchUsers();
      }, []);


    return (
        <Flex
            h="100vh"
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
                        alignItems="center"
                    >
                        <Heading
                            mt={50}
                            mb={[25, 50, 100]}
                            fontSize="3xl"
                            alignSelf="center"
                            letterSpacing="tight"
                        >
                            R.E.D.
                        </Heading>
                        <Flex
                            flexDir={["row", "row", "column", "column", "column"]}
                            align={["center", "center", "center", "flex-start", "flex-start"]}
                            wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                            justifyContent="center"
                        >
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link href="/" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                </Link>
                                <Link href="/" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Live Data</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link href="/historic-graphs" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                </Link>
                                <Link href="/historic-graphs" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Historic Data</Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Column 2 */}
            <Flex
                w="85%"
                p="3%"
                flexDir="column"
                overflow="hidden"
                h="100vh"
            >
                <Text
                    fontWeight="bold"
                    mb={4}
                    letterSpacing="tight"
                    className="text1"
                    fontSize="3xl"
                >
                    Live Graphs
                </Text>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                >     
                    <MyChart w="50%" h="40vh" m="3" title="Temperature of Solar Panel"/>
                    <MyChart w="50%" h="40vh" m="3" title="Temperature of Solar Panel"/>
                </Flex>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                >     
                    <MyChart w="100%" h="35vh" m="3" title="Temperature of Solar Panel"/>

                </Flex>
            </Flex>

        </Flex>
    )
}