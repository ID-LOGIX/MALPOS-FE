import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Image, Text } from '../../elements';
import { Box } from '../../elements';
import { useState } from 'react';
import CusTabButtons from '../../elements/CusTabButtons';
export default function SupportModel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const buttonList = [
        { text: "Chat", index: 0, id: "" },
        { text: "Youtube ", index: 1, id: "1" },
        { text: "Articles ", index: 2, id: "2" },
    ];
    return (
        <div>
            <Row>
                <Col md={3}>
                    <Text as={'span'} className={' w100 f-13'}>Brand</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>Tis Software</Text><br />
                    <Text as={'span'} className={' w100 f-13'}>Venue</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>Main</Text><br />
                    <Text as={'span'} className={' w100 f-13'}>IP Address</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>192.168.1.101</Text><br />
                    <Text as={'span'} className={' w100 f-13'}>Terminal</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>Malpos Test (ID : 6)</Text><br />
                    <Text as={'span'} className={' w100 f-13'}>Terminal Version</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>2.20002.de2</Text><br />
                    <Text as={'span'} className={' w100 f-13'}> Terminal App Version</Text><br />
                    <Text as={'span'} className={'bold w100 f-13'}>1.34v</Text><br />
                </Col>
                <Col md={9}>
                    <Box className={'support-contact d-flex-c'}>
                        <Box className={'cus-mr-15'}>
                            <FontAwesomeIcon icon={faPhone} color='#fff' size='2x' />
                        </Box>
                        <Box>
                            <Text as={'span'} className={'bold white  f-13'}>Support</Text><br />
                            <h4 className='bold white'>012 123 333 210</h4>
                        </Box>
                    </Box>
                    <Row className='cus-ptb'>
                        <Col md={4}>
                            <Box className={'support-left'}>
                                {buttonList.map((buttonText) => (
                                    <CusTabButtons className={'support-left-btns'}
                                        key={buttonText.index}
                                        buttonText={buttonText}
                                        activeIndex={activeIndex}
                                        handleItemClick={handleItemClick}
                                    />
                                ))}
                            </Box>
                        </Col>
                        <Col md={8}>
                        {activeIndex === 0 && (
                            <Box className={'box-2x2'}>
                                <Image src={'images/malpos-qe.png'} alt={'malpos-qr'}/>
                                <Text as={'span'} className={'bold w100 f-13 cus-ml-10'}>Chat QR Code</Text><br />
                            </Box>
                        )}
                          {activeIndex === 1 && (
                            <Box className={'box-2x2'}>
                                <Image src={'images/malpos-qe.png'} alt={'malpos-qr'}/>
                                <Text as={'span'} className={'bold w100 f-13 cus-ml-10'}>Youtube QR Code</Text><br />
                            </Box>
                        )}
                      {activeIndex === 2 && (
                            <Box className={'box-2x2'}>
                                <Image src={'images/malpos-qe.png'} alt={'malpos-qr'}/>
                                <Text as={'span'} className={'bold w100 f-13 cus-ml-10'}>Articles QR Code</Text><br />
                            </Box>
                        )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
