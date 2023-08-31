import React from 'react'
import { Box, Text } from '../../elements'
import ToggleSwich from '../../fields/ToggleSwich'
import { Row, Col } from 'react-bootstrap'

export default function CashRegisterStationTab() {
    return (
        <div>
            <Row>
                <Text as={'span'} className={'bold'}>Station</Text>
                <Col md={12} className='cus-mt-5 '>
                    <Box className={'cash-register-tabs-max-h'}>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Receipt</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Hot Bar</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Cold Bar</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Shesha</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Kitchen</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Tea Station</Text>
                            </Box>
                            <Box>
                                <ToggleSwich />
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    </Box>
                </Col>
            </Row>
        </div>
    )
}
