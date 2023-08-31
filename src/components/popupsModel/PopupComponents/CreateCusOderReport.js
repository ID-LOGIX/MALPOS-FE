import React from 'react'
import { Row,Col,Button } from 'react-bootstrap'
import { Text ,Box} from '../../elements'
import { LabelField } from '../../fields'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCheck, faPrint, faClock, faFile } from '@fortawesome/free-solid-svg-icons';
import ToggleSwich from '../../fields/ToggleSwich';
export default function CreateCusOderReport() {
  return (
    <div>
        <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col md={8} className='pr-0' >
                                        <LabelField fieldSize={'w100'} type={'text'} placeholder={'12 March 23'} label={'To'} />
                                    </Col>
                                    <Col md={4}className='pr-0' >
                                        <LabelField fieldSize={'w100'} type={'text'} placeholder={'12:33'} label={'-'} />
                                    </Col>
                                    <Col md={8} className='cus-mt-5 pr-0'>
                                        <LabelField fieldSize={'w100'} type={'text'} placeholder={'12 March 23'} label={'From'} />
                                    </Col>
                                    <Col md={4} className='cus-mt-5 pr-0'>
                                        <LabelField fieldSize={'w100'} type={'text'} placeholder={'12:33'} label={'-'} />
                                    </Col>
                                    <Col md={12} className='cus-mt-5 pr-0'>
                                        <LabelField
                                            label="Report Type "
                                            option={["Simple", "Urgent", "Demand"]}
                                            fieldSize="w100"
                                        />
                                    </Col>
                                    <ToggleSwich
                                        label="with Transaction"
                                        onToggle={(isChecked) => {
                                            // Do something with isChecked 
                                        }}
                                    />
                                    <ToggleSwich
                                        label="Accounts"
                                        onToggle={(isChecked) => {
                                            // Do something with isChecked 
                                        }}
                                    />
                                    <Box className={'mh-100'}>
                                        
                                    </Box>
                                    <Button className="cus-btn w100" >
                                       <FontAwesomeIcon icon={faFile}/> Make Report
                                    </Button>
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Box className={'name-title name-title-wo-shad'}>
                                    <Box className={'name-title-content'}>
                                        <h3>TIS Group</h3>
                                        <Text as='span' className={'f-13 bold'}>+9323742345</Text>
                                    </Box>
                                    <Box className={'dotBox-main'}>
                                        <FontAwesomeIcon icon={faPrint} /> <Text as={'span'} className={'f-13'}>Print</Text>
                                    </Box>

                                </Box>
                                <Box className={'model-order-receipt-details-right'}>
                                    <Text as={'span'} className={'f-12 bold'}>From : 12 March 2023 12:12</Text>
                                    <br />
                                    <Text as={'span'} className={'f-12 bold'}>To : 12 March 2023 12:12</Text>
                                    <Box >
                                        <FontAwesomeIcon icon={faClock} color='#ee3432' />
                                        <Text as={'span'} className={'f-12 bold'}> - 01 January 2023 12:12 AM</Text>
                                    </Box>
                                    <hr />
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Subtotal</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Tax</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Gift</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Serices</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 d-flex-2'}>Discount</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7 d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Free Dilivery</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Product Return</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'cus-ptb-5  green w100'}>
                                        <h4>Total : 0</h4>
                                    </Box>
                                    <hr/>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Guest Left</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>Staff's mistake</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'d-flex'}>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2'}>On house</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-7'}> ----------------------------------------------</Text>
                                        <Text as={'span'} className={'f-12 bold  d-flex-2 text-end'}>0</Text>
                                    </Box>
                                    <Box className={'cus-ptb-5  green w100'}>
                                        <h4>Total : 0</h4>
                                    </Box>
                                </Box>
                            </Col>
                        </Row>
                    </Col>
    </div>
  )
}
