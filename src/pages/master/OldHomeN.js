import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Box, Image, Text } from '../../components/elements'

export default function OldHomeN() {
    const [open, Close] = useState(false)
    const [open2, Close2] = useState(false)
    const handleOpen = () => {
        Close(!open)
    }
    const handleOpen2 = () => {
        Close2(!open2)
    }
    return (
        <div>
            <Col md={12} lg={6}>
                <Row>
                    <Col md={12}>
                        <Box className={'oldNot-min-w'}>
                            <Row>
                                <Col md={8}>
                                    <Box onClick={handleOpen} className={'d-flex d-flex-ac f-13 cusur-p'}>
                                        <Box>
                                            <Image src={'images/fox.PNG'} alt={'fox-img'} />
                                        </Box>
                                        <Box className={''}>
                                            <Text as={'span'}>Customer has send the order</Text><br />
                                            <Text as={'span'}>First floor 222/3 ALbebsi</Text>
                                        </Box>
                                    </Box>
                                </Col>
                                <Col md={4}>
                                    <Text as={'span'} className={'f-13 bold text-end'}>23.4.2023 March </Text>
                                </Col>
                                {
                                    open ?
                                        <>
                                            <Col md={8}>
                                                <Text as={'span'} className={'bold f-13'}>Papaue new Geniuea</Text>
                                            </Col>
                                            <Col md={4} >
                                                <Text as={'span'} className={'text-end bold f-13'}>1 x 0 ریال</Text>
                                            </Col>
                                            <hr />
                                            <Col md={12} >
                                                <Text as={'span'} className={'text-end bold f-13'}>Total : 0 ریال</Text>
                                            </Col>
                                        </>
                                        : ""
                                }
                                <Col md={8}>
                                    <Box onClick={handleOpen2} className={'d-flex d-flex-ac f-13 cusur-p'}>
                                        <Box>
                                            <Image src={'images/stop.PNG'} alt={'fox-img'} />
                                        </Box>
                                        <Box className={''}>
                                            <Text as={'span'}>Customer has send the order</Text><br />
                                            <Text as={'span'}>First floor 222/3 ALbebsi</Text>
                                        </Box>
                                    </Box>
                                </Col>
                                <Col md={4}>
                                    <Text as={'span'} className={'f-13 bold text-end'}>15.04.2022 Jnauary </Text>
                                </Col>
                                {
                                    open2 ?
                                        <>
                                            <Col md={8}>
                                                <Text as={'span'} className={'bold f-13'}>Papaue new Geniuea</Text>
                                            </Col>
                                            <Col md={4} >
                                                <Text as={'span'} className={'text-end bold f-13'}>1 x 0 ریال</Text>
                                            </Col>
                                            <hr />
                                            <Col md={12} >
                                                <Text as={'span'} className={'text-end bold f-13'}>Total : 0 ریال</Text>
                                            </Col>
                                        </>
                                        : ""
                                }
                            </Row>
                        </Box>
                    </Col>
                </Row>
            </Col>


        </div>
    )
}
