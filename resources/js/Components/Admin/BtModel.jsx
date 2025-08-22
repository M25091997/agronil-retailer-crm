import axiosClient from '@/axiosClient';
import { Landmark } from 'lucide-react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BtModel({ title, form, onSubmit, triggerLabel = "Open Modal" }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        if (onSubmit) onSubmit();

        const formData = new FormData();
        
        try {
          const response  =  axiosClient.post('/admin/orders/payments/)
            
        } catch (error) {
            
        }

        setShow(false);
    };

    return (
        <>
            {/* Trigger Button */}
            <Button variant="success" className='btn-sm' onClick={handleShow}>
                <Landmark /> {triggerLabel}
            </Button>

            <Modal show={show} onHide={handleClose} className='mt-5'>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {form}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
