import React, { Component } from 'react';
import {Form, Button, Input} from 'muicss/react';

export class AddTask extends Component {
  state = {
    task: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddTask(this.state.task);
  }

  changeHandler = (e) => {
    this.setState({task: e.target.value});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Input required={true} hint="Add Task" onChange={this.changeHandler} />
        <Button color="primary">Add</Button>
      </Form>
    );
  }
}

export default AddTask;