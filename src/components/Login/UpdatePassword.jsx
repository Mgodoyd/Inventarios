import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatPassword] = useState('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the submitButtonClicked state to true to indicate that the submit button was clicked
    setSubmitButtonClicked(true);

    // Handle form submission logic here
    // You can access the entered email, password, and repeatpassword values using the respective variables

    // Clear form fields after submission
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  return (
    <div className='container-form'>
      <div style={{ position: 'absolute', top: 15, right: -20 }}>
        <Image src="../../../Images/umg.png" style={{ width: '170px', height: 'auto' }} />
      </div>
      <div className='password'></div>
      <Form className='form-password' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className='text'>Email address</Form.Label>
          <Form.Control
            className={`email-password ${submitButtonClicked && email === '' ? 'required-field' : ''}`}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label className='text'>New Password</Form.Label>
          <Form.Control
            className={`password-from ${submitButtonClicked && password === '' ? 'required-field' : ''}`}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="repeatpassword">
          <Form.Label className='text'>Repeat Password</Form.Label>
          <Form.Control
            className={`password-from ${submitButtonClicked && repeatpassword === '' ? 'required-field' : ''}`}
            type="password"
            placeholder="Repeat Password"
            value={repeatpassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className='button-password' variant="primary" type="submit" onClick={() => setSubmitButtonClicked(true)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePassword;
