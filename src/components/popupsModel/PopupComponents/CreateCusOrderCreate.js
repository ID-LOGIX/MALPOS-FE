import React from 'react'
import { Box } from '../../elements'
import { Col, Button, Row } from 'react-bootstrap'
import { LabelField } from '../../fields'
import { LabelTextarea } from '../../fields'
export default function CreateCusOrderCreate(props) {
    return (
        <div>
            <Box className={'cus-order-model-right'}>
                <Box>
                    <h3>Create Customer</h3>
                </Box>
                <Box>
                    <Button className="cus-btn" onClick={props.closeModal}>
                        Create
                    </Button>
                </Box>
            </Box>
            <Box className={'cus-order-model-create-customer'}>
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <LabelField type={'text'} fieldSize={'w100'} placeholder={'Full Name'} label={'Full Name'} />
                        </Col>
                        <Col md={6}>
                            <LabelField type={'number'} fieldSize={'w100'} placeholder={'Code'} label={'Code'} />
                        </Col>
                        <Col md={6}>
                            <LabelField
                                label="Select Country"
                                option={["Dubai", "Saudia Arabia", "Iran", "Pakistan"]}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={6}>
                            <LabelField
                                label="Select Grpup"
                                option={["Station", "Kitchen", "Hotbar", "Shisha"]}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={12}>
                            <LabelField
                                type={'text'}
                                label="Address"
                                placeholder={'Address'}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={4}>
                            <LabelField
                                label="Select Gender"
                                option={["Male", "Female", "Other"]}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={4}>
                            <LabelField
                                type={'date'}
                                label="Date"
                                placeholder={'Date'}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={4}>
                            <LabelField
                                type={'email'}
                                label="Email"
                                placeholder={'Email'}
                                fieldSize="w100"
                            />
                        </Col>
                        <Col md={12}>
                            <LabelTextarea fieldSize="w-100 h-text-md" placeholder={'Description'} />
                        </Col>
                    </Row>
                </Col>
            </Box>
        </div>
    )
}
