// src/components/Signup.js

import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }

  return (
    <Form onSubmit={handleSubmit} error={true} success={false}>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Username:</label>
          <Input name="username" placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Email:</label>
          <Input name="email" type="email" placeholder="Email" />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Password:</label>
          <Input name="password" type="password" placeholder="Password" />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password:</label>
          <Input name="confirm_password" type="password" placeholder="Confirm Password" />
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Button type="submit">Signup</Button>
      </Form.Group>
    </Form>
  );
};

export default Signup;