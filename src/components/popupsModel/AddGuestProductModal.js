import React, { useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap'
import { Text } from '../elements'
import data from "../../data/master/productList.json";
import ImageCards from '../cards/ImageCards';
import { Box } from '../elements';
import { faCheck, faMinus, faPlus, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LabelField } from '../fields';
export default function AddGuestProductModal(props) {
    // const handleClose = () => props.handleCloseModel();
    // const handleShow = () => props.handleShowModel();
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
    };
  
    const handleShow = () => {
      setShow(true);
    };
    return (
        <div>
            <Modal className='add-guestProduct-model' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Flat White </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={9}>
                            <Col md={12} className='mb-20'>
                                <Text as={'span'} className={'bold f-13 '}>Flat-White Type-920-BCat</Text>
                            </Col>
                            <hr />
                            <Col md={12} className='mb-10'>
                                <Box className={"product-img-card"}>
                                    {data.product.tbody.slice(0, 3).map((item, i) => (
                                        <Box key={i} className={'imgCard'}>
                                            <ImageCards
                                                Imgsrc={item.src}
                                                productTitle={item.heading}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Col>
                        </Col>
                        <Col md={3}>
                            <Box className={'Add-sub-quan d-flex'}>
                                <Button className='Add-sub-quan-minus'><FontAwesomeIcon icon={faMinus} /> </Button>
                                <LabelField fieldSize={'w100'} type={'text'} placeholder={'0'} />
                                <Button className='Add-sub-quan-minus'><FontAwesomeIcon icon={faPlus} /> </Button>
                            </Box>
                            <Box className={'cal-btns-wrapper d-flex-wrap'}>
                                <button className={'cal-btns'}>1</button>
                                <button className={'cal-btns'}>2</button>
                                <button className={'cal-btns'}>3</button>
                                <button className={'cal-btns'}>4</button>
                                <button className={'cal-btns'}>5</button>
                                <button className={'cal-btns'}>6</button>
                                <button className={'cal-btns'}>7</button>
                                <button className={'cal-btns'}>8</button>
                                <button className={'cal-btns'}>9</button>
                                <button className={'cal-btns'}>.</button>
                                <button className={'cal-btns'}>0</button>
                                <button className={'cal-btns'}>
                                    <FontAwesomeIcon icon={faDeleteLeft} />
                                </button>
                            </Box>
                            <Col md={12}>
                                <Button className="w-100 mt-10"> <FontAwesomeIcon icon={faCheck} className='f-13' />  Save  </Button>
                            </Col>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Text as={'span'} className={'bold f-13'}>Subtotal : 32.40 $</Text>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
