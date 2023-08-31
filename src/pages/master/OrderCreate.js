import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box, Button, Text } from '../../components/elements'
import PageLayout from '../../layouts/PageLayout'
import Sidebar from '../../layouts/Sidebar'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function OrderCreate() {
  return (
    <div>
        <PageLayout>
            <Col md={1}>
                <CardLayout>
                <Sidebar/>
                </CardLayout>
            </Col>
            <Col md={5}>
                <Row>
                    <Col md={4}>
                       Takeaway 
                    </Col>
                    <Col md={4}>
                       00:00 
                    </Col>
                    <Col md={4}>
                       #32434 
                    </Col>
                    <Col md={12}>
                        <Box className={'orplace-place-box'}>
                            order place box
                        </Box>

                    </Col>
                    <Row md={12}>
                        <CardLayout>
                            <Col md={6}>
                                <Text as='span' className={'f-13'}>
                                    Discount
                                </Text>
                                <Text as='span' className={' f-13 bold'}>
                                    233.00
                                </Text>
                            </Col>
                            <Col md={6}>
                                <Text as='span' className={'f-13'}>
                                    Subtotal
                                </Text>
                                <Text as='span' className={' f-13 bold'}>
                                    34534.4
                                </Text>
                            </Col>
                            <Button><FontAwesomeIcon icon={faPlus}/> </Button>
                        </CardLayout>
                    </Row>
z                </Row>
            </Col>
        </PageLayout>
    </div>
  )
}
