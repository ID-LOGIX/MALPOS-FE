import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CusModel from './CusModel';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCheck, faPrint, faClock, faFile, faArrowCircleRight, faRotateRight, faCircle, faXmark, faPhone, faPlus, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { LabelField, LabelTextarea } from '../fields';
import { Box, Icon, Text, Textarea } from '../elements';
import IconSearchBar from '../fields/IconSearchBar';
import OptionListInputGroup from '../fields/OptionListInputGroup';
import CreateCusOrderContact from './PopupComponents/CreateCusOrderContact';
import CreateCusOrderCreate from './PopupComponents/CreateCusOrderCreate';
import ToggleSwich from '../fields/ToggleSwich';
import CreateCusOderReport from './PopupComponents/CreateCusOderReport';
import CreateCusOrderTansaction from './PopupComponents/CreateCusOrderTansaction';
import TerminalStatus from './PopupComponents/TerminalStatus';
import SupportModel from './PopupComponents/SupportModel';
import OpenCashRegisterModel from './PopupComponents/OpenCashRegisterModel';
export function Model1(props) {
    const options = ["apple", "banana", "cherry", "date", "elderberry"];
    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Return"
            modalBody={
                <>
                    <Col md={12}>
                        <LabelField type={'number'} placeholder="0" />
                    </Col>
                    <Col md={12}>
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
                    </Col>
                </>
            }
            modalFooter={
                <>
                    <Button className="cus-btn w100" onClick={props.closeModal}>
                        <FontAwesomeIcon icon={faCheck} /> Save
                    </Button>
                </>
            }
            headerClassName="model-header f-13"
            bodyClassName="return-receipt-model-order"
            footerClassName="return-receipt-model-order-footer"
        />
    );
}

export function CustomerReceiptModel(props) {
    const [showContent, setShowContent] = useState(false);
    const [showContent2, setShowContent2] = useState(false);

    const toggleContent = () => {
        setShowContent(!showContent);
    };
    const toggleContent2 = () => {
        setShowContent2(!showContent2);
    };
    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Customer"
            modalBody={
                <>
                    <Row>
                        <Col md={12}>
                            <Row>
                                <Col md={4}>
                                    <IconSearchBar placeholder={'Search'} />
                                    <Box className={'cus-order-model-search'}>
                                        <Box onClick={toggleContent2} className={'cus-order-model-contact'}>
                                            <Box >
                                                <Box className={'cus-order-model-contact-Alp'}>
                                                    SA
                                                </Box>
                                            </Box>
                                            <Box className={'f-13 bold'}>
                                                TIS<br />
                                                +93246398463494
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button className="cus-btn w100" onClick={toggleContent}>
                                        Create Customer
                                    </Button>
                                </Col>
                                <Col md={8}>
                                    <>
                                        {showContent2 && <CreateCusOrderContact />}
                                        {showContent && !showContent2 && <CreateCusOrderCreate />}
                                    </>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </>
            }
            modalFooter={
                <>

                </>
            }
            headerClassName="customer-order-model-header"
            bodyClassName="customer-order-model-body"
            footerClassName="customer-order-model-footer"
        />
    );
}

export function Model3(props) {
    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Report"
            modalBody={
                <>
                    <CreateCusOderReport/>
                </>
            }
            headerClassName="model-header"
            bodyClassName="cus-model-report-order-body"
            footerClassName="cus-model-report-order-footer"
        />
    );
}


export function OrderAddTransactionModel(props) {
    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Add Transaction"
            modalBody={
                <>
                <CreateCusOrderTansaction/>
                </>
            }
            headerClassName="order-Add-Tansaction-model-header"
            bodyClassName="order-Add-Tansaction-model-body"
            footerClassName="order-Add-Tansaction-model-footer"
        />
    );
}

export function ClearCashe(props) {
    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Admin Required Password"
            modalBody={
                <>
                   <LabelField type={'password'} placeholder={'Password '} label={'Password '}/>
                   <Button className='cus-mt-5 cus-mt-5 float-r'> <FontAwesomeIcon icon={faCheck}/> Confirm Password</Button>

                </>
            }
            headerClassName="model-header"
            bodyClassName="cus-model-clear-cashe-order-body"
            footerClassName="cus-model-clear-cashe-order-footer"
        />
    );
}

export function Terminals(props) {
    const closeButton = props.closeModal;

    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle={
                
                <>
                Local Terminal 192.168.1.101  <FontAwesomeIcon icon={faRotateRight}/>
                </>
            }
            modalBody={
                <>
                <TerminalStatus  closeButton={closeButton} />
                </>
            }
            headerClassName="model-header"
            bodyClassName="cus-model-terminals-order-body"
            footerClassName="cus-model-terminals-order-footer"
        />
    );
}

export function Support(props) {
    const closeButton = props.closeModal;

    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Support"
            modalBody={
                <>
              <SupportModel />
                </>
            }
            headerClassName="model-header"
            bodyClassName="cus-model-support-order-body"
            footerClassName="cus-model-support-order-footer"
        />
    );
}
export function OpenCashRegister(props) {
    const closeButton = props.closeModal;

    return (
        <CusModel
            showModal={props.showModal}
            closeModal={props.closeModal}
            modalTitle="Open Cash Register"
            modalBody={
                <>
               <OpenCashRegisterModel/>
                </>
            }
            headerClassName="model-header"
            bodyClassName="cus-model-Register-order-body"
            footerClassName="cus-model-Register-order-footer"
        />
    );
}