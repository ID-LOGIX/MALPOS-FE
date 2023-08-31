import { faCheck, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import { Box } from '../elements';
import { LabelField } from '../fields'

export default function GuestSelectModel(props) {
    const handleCloseB = () => props.handleCloseModel();
    const handleShow = () => props.handleShowModel();
    return (
        <div>
            <Row>
                <Col md={12}>
                    <Modal className='guestSelect-model f-13' show={props.show} onHide={handleCloseB}>
                        <Modal.Header closeButton>
                            <Modal.Title className='f-13'>Guest Select</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Col md={12}>
                                <LabelField type={'number'} placeholder="0" />
                            </Col>
                            <Col md={12}>
                                <Box className={'cal-btns-wrapper d-flex-wrap'}>
                                <button className={'cal-btns'}>1</button>
                                <button className={'cal-btns'}>2</button>
                                <button className={'cal-btns'}>3</button>
                                <button  className={'cal-btns'}>4</button>
                                <button className={'cal-btns'}>5</button>
                                <button className={'cal-btns'}>6</button>
                                <button className={'cal-btns'}>7</button>
                                <button className={'cal-btns'}>8</button>
                                <button className={'cal-btns'}>9</button>
                                <button className={'cal-btns'}>.</button>
                                <button className={'cal-btns'}>0</button>
                                <button className={'cal-btns'}>
                                    <FontAwesomeIcon icon={faDeleteLeft}/>
                                </button>
                                </Box>
                            </Col>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className='cus-btn' onClick={handleCloseB}>
                                <FontAwesomeIcon icon={faCheck} />  Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </div>
    )
}
