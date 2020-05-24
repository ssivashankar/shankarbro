import React, { useState } from 'react'
import { Alert, Button, Jumbotron, Form, Modal, Spinner, Toast } from 'react-bootstrap'
import axios from 'axios'

function AccessTokenGenerator() {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [showA, setShowA] = useState(true)
    const [formValues, setFormValues] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggleShowA = () => setShowA(!showA);

    function handleSubmit(e) {
        e.preventDefault()
        setFormValues({
            env: e.target.env.value,
            customerID: e.target.customerID.value,
            pass: e.target.pass.value
        })
        setShow(true)
        setTimeout(() => {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    setShow(false)
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setMessage(
                        'Access token geneated succesfully'
                    )
                })
        }, 3000)
    }

    return (
        <Form onSubmit={handleSubmit}>
            {
                message &&
                <Form.Row className="mTop20">
                <Alert variant={'success'}>
                    {message}
                </Alert>  
                </Form.Row>                  
            }
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Select the Environment</Form.Label>
                <Form.Control as="select" name="env">
                    <option>Select Environment</option>
                    <option>1</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter the Customer ID:</Form.Label>
                <Form.Control type="text" name="customerID" placeholder="Customer ID" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter the Password:</Form.Label>
                <Form.Control type="password" name="pass" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Generate Token
            </Button>
            {
                !show && formValues &&
                <Toast className="mTop20" show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <strong className="mr-auto">Form Data</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <pre>
                            {JSON.stringify(formValues, null, 3)}
                        </pre>
                    </Toast.Body>
                </Toast>
            }
            {
                show &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </Form>
    )
}

export default AccessTokenGenerator
