import React from 'react'
import { Modal } from 'react-bootstrap';

export default function CusModel(props) {
    const {
        showModal,
        closeModal,
        modalTitle,
        modalBody,
        modalFooter,
        headerClassName,
        bodyClassName,
        footerClassName,
    } = props;
    return (
        <div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton className={headerClassName}>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={bodyClassName}>{modalBody}</Modal.Body>
                <Modal.Footer className={footerClassName}>{modalFooter}</Modal.Footer>
            </Modal>
        </div>
    )
}
