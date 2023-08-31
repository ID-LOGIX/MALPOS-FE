import DotBox from '../../elements/DotBox'

import { faDollarSign, faEllipsisVertical, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { Text, Box } from '../../elements'
import { Tbody, Td, Th, Thead, Tr } from '../../elements/Table'
export default function CreateCusOrderContact() {
    const[open,Close] = useState(false)
    const handleDotbox = () =>
    {
        Close(!open)
    }
    const linkTexts = ['Add Customer', 'Add Fund', 'Remove Fund'];

    return (
        <div>
                <Box className={''}>
                    <Row>
                        <Col md={12}>
                            <Box className={'name-title'}>
                                <Box className={'name-title-content'}>
                                    <h3>TIS Group</h3>
                                    <Text as='span'>+9323742345</Text>
                                </Box>
                                <Box onClick={handleDotbox} className={'dotBox-main'}>
                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                    { open?
                                        <>
                                        <DotBox linkTexts={linkTexts}/>
                                        </>
                                        :""
                                    }
                                </Box>
                            </Box>
                        </Col>
                        <Box className={'min-h-300'}>

                        <Col md={12} className={'cus-ptb'}>
                            
                            <Row>
                                <Col md={6} className={'m-customer-bonus-col-6'} >
                                    <Box className={'m-customer-details-bonus'}>
                                        <Box className={'cus-bonus-start'}>
                                            <div style={{ height: "32px", width: "36px" }}>

                                                <FontAwesomeIcon icon={faStar} size="2x" color='#f29b30' />
                                            </div>
                                        </Box>
                                        <Box className={'cus-bonus-con'}>
                                            <h6 className='bold'>0</h6>
                                            <Text as={'span'} className={'f-13'}>Bonus</Text>
                                        </Box>
                                    </Box>
                                </Col>
                                <Col md={6} className={'m-customer-bonus-col-6'}>
                                    <Box className={'m-customer-details-bonus'}>
                                        <Box className={'cus-bonus-start'}>
                                            <div style={{ height: "32px", width: "36px", display: "flex", justifyContent: "center" }}>
                                                <FontAwesomeIcon icon={faDollarSign} size="2x" color='#ee3432' />
                                            </div>
                                        </Box>
                                        <Box className={'cus-bonus-con'}>

                                            <h6 className='bold'>25.00 SAR</h6>
                                            <Text as={'span'} className={'f-13'}>Balance</Text>
                                        </Box>
                                    </Box>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} className='cus-ptb'>
                            <Box className={'cus-detail-bonus-tot '}>
                                <Row>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-13'}>Total spent</Text>
                                        <h6>25.00 SAR</h6>
                                    </Col>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-13'}>Total discount</Text>
                                        <h6>25.00 SAR</h6>
                                    </Col>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-13'}>Total bonus</Text>
                                        <h6>25.00 SAR</h6>
                                    </Col>
                                    <Col md={3}>
                                        <Text as={'span'} className={'f-13'}>Receipt count</Text>
                                        <h6>25.00 SAR</h6>
                                    </Col>
                                </Row>
                            </Box>
                        </Col>
                        <Col md={12}>
                            <hr />
                        </Col>
                        <Col md={12} className='cus-ptb'>
                            <Box className={'m-cus-group-dis'}>
                                <Row>
                                    <Col md={6}>
                                        <h3>TIS</h3>
                                    </Col>
                                    <Col md={6}>
                                        <Box className={'discounted'}>
                                            <Text as='span' className={'f-13'}>Group Discount</Text>
                                            <Text as='span' className={'f-13 percentage'}>100%</Text>
                                        </Box>
                                    </Col>
                                </Row>
                            </Box>
                        </Col>
                        <Col md={12}>
                            <hr />
                        </Col>
                        <Col md={12} className='cus-ptb'>
                            <Box className={'cus-info-bonus cus-ptb'}>
                                <Row>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-12 bold'}>Phones</Text><br />
                                        <Text as={'span'} className={'f-12'}>+966 9200 33035</Text>
                                    </Col>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-12 bold'}>Gender</Text><br />
                                        <Text as={'span'} className={'f-12'}>Male</Text>
                                    </Col>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-12 bold'}>Date of birth</Text><br />
                                        <Text as={'span'} className={'f-12'}>08.12.1987</Text>
                                    </Col>
                                    <Col md={3}>

                                        <Text as={'span'} className={'f-12 bold'}>E-mail</Text><br />
                                        <Text as={'span'} className={'f-12'}>sales@tissoftware.sa</Text>
                                    </Col>
                                </Row>
                            </Box>
                        </Col>
                        <Box className={'cus-ptb-25'}>
                            <h3>
                                Receipt
                            </h3>
                        </Box>
                        <Table >
                            <Thead className={'f-12'}>
                                <Tr>
                                <Th>#Receipt</Th>
                                <Th>Receipt Close</Th>
                                <Th>Subtotal</Th>
                                <Th>Payment method</Th>
                                </Tr>
                            </Thead>
                            <Tbody className={'f-12'}>
                                <Tr>
                                <Td>1123</Td>
                                <Td>14 March 23 12:33</Td>
                                <Td>72 ریال</Td>
                                <Td>ریال</Td>
                                </Tr>
                                <Tr>
                                <Td>1123</Td>
                                <Td>14 March 23 12:33</Td>
                                <Td>72 ریال</Td>
                                <Td>ریال</Td>
                                </Tr>
                                <Tr>
                                <Td>1123</Td>
                                <Td>14 March 23 12:33</Td>
                                <Td>72 ریال</Td>
                                <Td>ریال</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        </Box>

                    </Row>
                </Box>
        </div>
    )
}
