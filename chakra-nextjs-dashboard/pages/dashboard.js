import React, { useState, useEffect} from 'react'
import {
    Flex,
    Heading,
    Text,
    Link
} from '@chakra-ui/react'
import RealTimeGraph from '../components/RealTimeGraph'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';


export default function Dashboard() {
    //Use States
    const [graphData, setGraphData] = useState([])

    //Use Effects
    useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await fetch('/api/hello');
            const data = await response.json();
            const last100ValuesData = data.slice(-100);

            setGraphData(last100ValuesData)
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        }
        fetchUsers();
      }, []);

      useEffect(() => {
        async function getSingleVal() {
            const response = await fetch('/api/singleSelect');
            const data = await response.json();
            const newDat = [...graphData, data[0]]
            if (newDat.length > 100) {
                newDat.shift();
            }
            setGraphData(newDat)
        }
        const interval = setInterval(() => {
            getSingleVal()
        }, 1000); // Run every second
      
          // Cleanup the interval when the component unmounts
          return () => clearInterval(interval);
    
    }, [graphData]);


    // Data 
    const times = graphData.map(item => item.create_date);
    const surfaceTemperature = graphData.map(item => item.surface_temperature);
    const watts = graphData.map(item => item.watts);
    const ambientTemperature = graphData.map(item => item.ambient_temperature)[graphData.length - 1];



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
                <Flex
                    flexDir="row"
                    justifyContent="space-between"

                >
                    <Text
                        fontWeight="bold"
                        mb={4}
                        letterSpacing="tight"
                        className="text1"
                        fontSize="4xl"
                    >
                        Live Graphs
                    </Text>
                    <Text
                        letterSpacing="tight"
                        fontSize="3xl"
                        className="text2"
                    >
                        {ambientTemperature}° 
                    </Text>
                </Flex>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                >     
                    <RealTimeGraph data = {watts} labels={times} label="Watts" w="50%" h="40vh" m="3" title="Power Produced by Hydro" backgroundColor="#4299e1" borderColor="#3182ce"/>
                    <RealTimeGraph data = {watts} labels={times} label = "Watts" w="50%" h="40vh" m="3" title="Power Generated by Wind" backgroundColor="#B2F5EA" borderColor="#81E6D9"/>
                </Flex>
                <Flex
                    flexDir="row"       
                    align="center"      
                    gap={4} 
                > 
                    <RealTimeGraph data = {watts} labels={times} label="Watts" w="50%" h="35vh" m="3" title="Power Generated by Solar" backgroundColor="#ECC94B" borderColor="#D69E2E"/>
                    <RealTimeGraph data = {surfaceTemperature} labels={times} label="Degrees" w="50%" h="35vh" m="3" title="Temperature of Solar Panel" backgroundColor="#ECC94B" borderColor="#D69E2E"/>
                </Flex>
            </Flex>

        </Flex>
    )
}