import React, { Component } from 'react';
import {Checkbox, Button} from 'muicss/react';

export class TaskItem extends Component {
  state = {
    task: this.props.task
  }

  changeHandler = (e, task) => {
    this.props.onEditState(task, e.target.checked);
  }

  deleteItem = () => {
    this.props.deleteItem(this.state.task._id.$oid);
  }

  render() {
    return (
      <div className="mui--divider-bottom">
        <Checkbox
          className={this.state.task.complete ? "completed" : ''}
          onChange={(e, task) => this.changeHandler(e, this.state.task)}
          name={this.state.task._id.$oid}
          label={this.state.task.text}
          defaultChecked={this.state.task.complete} />
        <Button color="danger" onClick={this.deleteItem}>X</Button>
      </div>
    );
  }
}

export default TaskItem;
