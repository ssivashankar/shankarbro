import React, { useState } from 'react'
import { Alert, Button, Form, Modal, Spinner, Toast } from 'react-bootstrap'
import axios from 'axios'

function AccessTokenGenerator() {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [toast, setToast] = useState({ showToast: true, refresh: false})
    const [formValues, setFormValues] = useState(null)
    const [validated, setValidated] = useState(false);
    const handleClose = () => setShow(false);
    const showToast = toast.showToast;
    const refresh = toast.refresh;
    const { env, customerID, pass } = formValues || {}

    function handleToast() {
        setToast({
            showToast: !showToast,
            refresh: !refresh
        })
        setFormValues({
            env: '',
            customerID: '',
            pass: ''
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(e)
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {
                message &&
                <Form.Row className="mTop20">
                <Alert variant={'success'}>
                    {message}
                </Alert>  
                </Form.Row>                  
            }
            <Form.Group controlId="environment">
                <Form.Label>Select the Environment</Form.Label>
                <Form.Control as="select" name="env" value={env}>
                    <option>Select Environment</option>
                    <option>one</option>
                    <option>two</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="customerID">
                <Form.Label>Enter the Customer ID:</Form.Label>
                <Form.Control value={customerID} type="text" name="customerID" placeholder="Customer ID" />
            </Form.Group>
            <Form.Group value={pass} controlId="pass">
                <Form.Label>Enter the Password:</Form.Label>
                <Form.Control type="password" name="pass" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Generate Token
            </Button>
            {
                !show && formValues &&
                <Toast className="mTop20" show={showToast} onClose={handleToast}>
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
