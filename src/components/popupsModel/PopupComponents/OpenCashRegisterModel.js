import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Text, Box } from '../../elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { LabelField } from '../../fields'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CashRegisterStationTab from './CashRegisterStationTab'
import CashRegisterSettingsTabs from './CashRegisterSettingsTabs'
export default function OpenCashRegisterModel() {
    const [handlePrinter, setHandlePrinter] = useState(true)
    const [handlePrinterNew, setHandlePrinterNew] = useState(false)
    const [handlePrinterNetwork, setHandlePrinterNetwork] = useState(false)
    const [handleOtherNetwork, setHandleOtherNetwork] = useState(false)
    const [key, setKey] = useState('home');
    const HandlePrint = () => {
        setHandlePrinter(!handlePrinter)   
        setHandleOtherNetwork(false)

         
    }
    const HandlePrintNewBtn = () => {
        setHandlePrinter(false)
  setHandlePrinterNew(true)
    }
    const HandlePrintNewBack = () =>
    { setHandlePrinter(true)
        setHandlePrinterNew(false)
        setHandlePrinterNetwork(false)
    }
    const HandlePrintNetwork = () =>
    {
        setHandlePrinter(false)
        setHandlePrinterNetwork(true)     
        setHandleOtherNetwork(false)

    }
    const HandleOtherNetwork = () =>
    {
        setHandleOtherNetwork(true)
        setHandlePrinter(false)
        setHandlePrinterNew(false)
        setHandlePrinterNetwork(false)     


    }
    return (
        <div>
            <Row>
                <Col md={3}>
                <Button onClick={HandlePrint} className='f-13 bold capitalize w100 cus-mb-5'>Printers</Button>
                    <Button onClick={HandleOtherNetwork} className='f-13 bold capitalize w100'>Kitchen Kit </Button>
                </Col>
                <Col md={9}>
                    { handleOtherNetwork?

                         <Box>
                         <Box className={'d-flex-sb'}>
                             <Box>
                                 <Box className={'d-flex'}>
                                     <h4 className='cus-mr'>Kitchen Kit (KID)</h4>
                                     <Box className={'printer-count'}> 1 </Box>
                                 </Box>
                                 
                             </Box>
                             <Box>
                                 <Button className='f-13 bold capitalize '>refresh</Button>
                             </Box>
                         </Box>
                         <Box className={'d-flex-sb cus-ptb'} >
                            <Box>
                             <Box className={'d-flex'}>
                                 <Text as={'span'} className={'bold f-13'}>192.168.19.101 </Text>
                                 <Text className={'printer-status f-13 bold'}>  online </Text>
                             </Box>
                             <Text className={'printer-status f-13 bold'}> Kitchen. Cold Bar . Drinks . Hot Drinks . Alpnos </Text>

                             </Box>

                             <Box>
                                 <Button className='f-13 bold capitalize cus-mr border-btn '>test Printer</Button>
                                 <Button onClick={HandlePrintNetwork} className='bold capitalize border-btn '>
                                     <FontAwesomeIcon icon={faAngleRight} />
                                 </Button>
                             </Box>
                         </Box>
                     </Box>
                     :""
                    }
                    {
                        handlePrinter ?
                            <Box>
                                <Box className={'d-flex-sb'}>
                                    <Box>
                                        <Box className={'d-flex'}>
                                            <h4 className='cus-mr'>Printers</h4>
                                            <Box className={'printer-count'}> 1 </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Button onClick={HandlePrintNewBtn} className='bold capitalize cus-mr '>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                        <Button className='f-13 bold capitalize '>refresh</Button>
                                    </Box>
                                </Box>
                                <Box className={'d-flex-sb cus-ptb'} >
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'bold f-13'}>192.168.19.101 </Text>
                                        <Text className={'printer-status f-13 bold'}>  online </Text>
                                    </Box>
                                    <Box>
                                        <Button className='f-13 bold capitalize cus-mr border-btn '>test Printer</Button>
                                        <Button onClick={HandlePrintNetwork} className='bold capitalize border-btn '>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            : ""
                    }
                    {
                        handlePrinterNew ?
                        <Box>
                        <Box className={'d-flex-sb cus-ptb'} >
                            <Box className={'d-flex'}>
                                <Button onClick={HandlePrintNewBack} className='bold capitalize border-btn '>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </Button>
                                <Text className={' cus-p-5 bold'}>  Network </Text>
                            </Box>
                            <Box>
                                <Button className='f-13 bold capitalize cus-mr border-btn '>test Printer</Button>
                                <Button className='bold capitalize border-btn '>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                        <hr />
                        <Row>
                            <Col md={5}>
                                <LabelField type={'number'} placeholder={'IP'} label={'Ip'} fieldSize={'w100'} />
                            </Col>
                            <Col md={3}>
                                <LabelField type={'number'} placeholder={'Port'} label={'Port'} fieldSize={'w100'} />

                            </Col>
                            <Col md={12}>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="Station" title="Station">
                                        <CashRegisterStationTab />
                                    </Tab>
                                    <Tab eventKey="Settings" title="Settings">
                                        <CashRegisterSettingsTabs />
                                    </Tab>

                                </Tabs>
                            </Col>
                        </Row>

                    </Box>
                        : ""

                    }
                    {
                        handlePrinterNetwork?
  
                 <Box>
                        <Box className={'d-flex-sb cus-ptb'} >
                            <Box className={'d-flex-c'}>
                                <Box>
                                <Button onClick={HandlePrintNewBack} className='bold capitalize border-btn cus-mr '>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </Button>
                                </Box>
                                <Box>
                                <Text className={' f-13  bold'}>Network </Text>
                                <Text className={' f-13 bold'}>192.168.245.44 </Text>
                                </Box>
                            </Box>
                            <Box>
                                <Button className='f-13 bold capitalize cus-mr border-btn '>test Printer</Button>
                                <Button className='bold capitalize border-btn '>
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                        <Row>
                            <Col md={12}>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="Station" title="Station">
                                        <CashRegisterStationTab />
                                    </Tab>
                                    <Tab eventKey="Settings" title="Settings">
                                        <CashRegisterSettingsTabs />
                                    </Tab>

                                </Tabs>
                            </Col>
                        </Row>

                    </Box>
                         :""
                        }
                </Col>
            </Row>
        </div>
    )
}
