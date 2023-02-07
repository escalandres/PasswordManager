import React, {useState} from "react"
import {Button, Form, Modal, Spinner} from 'react-bootstrap';


const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    url: '',
}
const initialBool = false;
const createPassword = () =>{
    const [show, setShow] = useState(initialBool);
    const [form, setForm] = useState(initialState);
    const handleOpenNewPassword = () =>{
        setShow((show) => !show);
    }
    // const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
            document.getElementById("newPasswordSpinner").classList.remove("hide")
            const { name, email, username, password, url} = form;
            const URL = 'http://localhost:5200/password/save-password';
            const user = cookies.get('user')
            console.log(user)
            const answer = await axios.post(`${URL}`, {
                name, user, email, username, password, url
            });
            console.log(answer)
            if(answer.data.status === "OK"){
                document.getElementById("newPasswordSpinner").classList.add("hide")
                handleOpenNewPassword()
                // this.setState({modal: !this.state.modal});
                state.text = "New password saved successfully!";
                state.type = "success";
                // document.getElementById("alert-message").setAttribute("text", "New password saved successfully!")
                // document.getElementById("alert-message").setAttribute("type", "success")
                // document.getElementById("alert-container").classList.remove("hide")
                setTimeout(() => {
                    console.log('w')
                    // load.classList.add("hide")
                    document.getElementById("alert-container").classList.add("hide")
                    window.location.reload();\product
                }, 4000);
            }
            else{
                document.getElementById("newPasswordSpinner").classList.add("hide")
                handleOpenNewPassword()
                state.text = "Error on saving password!";
                state.type = "danger";
                // document.getElementById("message").setAttribute("text", "")
                // document.getElementById("message").setAttribute("type", "")

            }
            //window.location.reload();
        //}
    }
    return(
        <Modal
                    onHide={handleOpenNewPassword}
                    show={show}
                    id="newPassword-modal"
                >
                    
                    <Modal.Dialog>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <div id="newPasswordSpinner" className="hide"><Spinner id="" animation="border"  />;</div>
                            
                            <Modal.Title id="modalName">Create a new password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Page Name</Form.Label>
                                <Form.Control id="newPasswordName" name="name" type="text" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label" >Email</Form.Label>
                                <Form.Control id="newPasswordEmail" name="email" type="email" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Username</Form.Label>
                                <Form.Control id="newPasswordUsername" name="username" type="text" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Password</Form.Label>
                                <Form.Control id="newPasswordPassword" name="password" type="password" onChange={handleChange}/>
                            </Form.Group>
                            <Form.Group className="form-group">
                                <Form.Label className="label">Website</Form.Label>
                                <Form.Control id="newPasswordUrl" name="url" type="url" onChange={handleChange}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleOpenNewPassword}>
                                Close
                            </Button>
                            <Button type="submit">Save Password</Button>
                        </Modal.Footer>
                    </Form>
                    </Modal.Dialog>
                </Modal>
    )
}