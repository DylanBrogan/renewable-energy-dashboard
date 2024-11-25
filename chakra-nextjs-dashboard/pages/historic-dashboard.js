import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import {
    Flex,
    Heading,
    Text,
    Link,
} from '@chakra-ui/react'
import StaticGraph from '../components/StaticGraph'

export default function HistoricDashboard() {
    //Use States
    const [graphData, setGraphData] = useState([]); 
    // Data
    const times = graphData.map(item => item.create_date);
    const surfaceTemperature = graphData.map(item => item.avg_surface_temperature);
    const solar_watts = graphData.map(item => item.solar_watts);
    const hydro_watts = graphData.map(item => item.hydro_watts);
    const wind_watts = graphData.map(item => item.wind_watts);

    //Use Effects
    useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await fetch('/api/historicTable');
            const data = await response.json();
            setGraphData(data)
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        }
        
        fetchUsers();
        console.log(graphData); 
        console.log(solar_watts); 
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
                                    <FontAwesomeIcon size="lg" icon={faChartLine} className="active-icon"/>
                                </Link>
                                <Link href="/" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                    <Text className="active">Live Data</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                <Link href="/historic-graphs" display={["none", "none", "flex", "flex", "flex"]}>
                                    <FontAwesomeIcon size="lg" icon={faChartLine} className="active-icon"/>
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
                    fontSize="4xl"
                >
                    Historic Graphs
                </Text>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                >    
                    <StaticGraph title="Power Produced By Hydro" label="Watts" labels={times} data={hydro_watts}  backgroundColor="#4299e1" borderColor="#3182ce" w="50%" h="40vh" m="3"/>
                    <StaticGraph title="Power Produced By Wind" label="Watts" labels={times} data={wind_watts} backgroundColor="#B2F5EA" borderColor="#81E6D9" w="50%" h="40vh" m="3"/>
                </Flex>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                >     
                    <StaticGraph title="Power Produced by Solar" label="Watts" labels={times} data={solar_watts} backgroundColor="#ECC94B" borderColor="#D69E2E" w="50%" h="35vh" m="3"/>
                    <StaticGraph title="Surface Temperature" label="Degrees" labels={times} data={surfaceTemperature} backgroundColor="#ECC94B" borderColor="#D69E2E" w="50%" h="35vh" m="3"/>
                </Flex>
            </Flex>
        </Flex>
    )
}