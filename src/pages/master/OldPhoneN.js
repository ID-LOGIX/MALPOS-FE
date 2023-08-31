import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Box, Image, Text } from '../../components/elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
                                    <Box  className={'d-flex d-flex-ac f-13 cusur-p'}>
                                        <Box>
                                            <Image src={'images/phone.PNG'} alt={'fox-img'} />
                                        </Box>
                                        <Box className={''}>
                                          <FontAwesomeIcon icon={faUser} color='#f29b30'/><Text as={'span'}>+92878348234925</Text>
                                        </Box>
                                    </Box>
                                </Col>
                                <Col md={4}>
                                    <Text as={'span'} className={'f-13 bold text-end'}>23.4.2023 March </Text>
                                </Col>
                               
                                <Col md={8}>
                                    <Box className={'d-flex d-flex-ac f-13 cusur-p'}>
                                        <Box>
                                            <Image src={'images/phone.PNG'} alt={'fox-img'} />
                                        </Box>
                                        <Box className={''}>
                                        <FontAwesomeIcon icon={faUser} color='#f29b30'/><Text as={'span'}>+92878348234925</Text>
                                        </Box>
                                    </Box>
                                </Col>
                                <Col md={4}>
                                    <Text as={'span'} className={'f-13 bold text-end'}>15.04.2022 Jnauary </Text>
                                </Col>
                            </Row>
                        </Box>
                    </Col>
                </Row>
            </Col>


        </div>
    )
}
