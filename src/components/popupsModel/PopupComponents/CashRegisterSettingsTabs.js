import React from 'react'
import { Box, Text } from '../../elements'
import ToggleSwich from '../../fields/ToggleSwich'
import { Row, Col } from 'react-bootstrap'
import { LabelField } from '../../fields'
export default function CashRegisterSettingsTabs() {
  return (
    <div>
 <Row>
                <Text as={'span'} className={'bold'}>Settings</Text>
                <Col md={12} className='cus-mt-5 '>
                    <Box className={'cash-register-tabs-max-h'}>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Make Sound</Text>
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
                                <Text as={'span'} className={'f-13 bold'}>Quik Drawer</Text>
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
                                <Text as={'span'} className={'f-13 bold'}>Quick Print</Text>
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
                                <Text as={'span'} className={'f-13 bold'}>Width</Text>
                            </Box>
                            <Box>
                            <LabelField type={'numbber'} placeholder={'0'} fieldSize={'w150px'}/>
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Code Page</Text>
                            </Box>
                            <Box >
                                
                                <LabelField type={'numbber'} placeholder={'0'} fieldSize={'w50px'}/>
                            </Box>
                        </Box>
                        <hr />
                    </Box>
                    <Box className={'cus-mt-5'}>
                        <Box className={'d-flex-sb '}>
                            <Box>
                                <Text as={'span'} className={'f-13 bold'}>Encoding</Text>
                            </Box>
                            <Box>
                            <LabelField type={'text'} placeholder={'23432sw4324'} fieldSize={'w150px'}/>
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
