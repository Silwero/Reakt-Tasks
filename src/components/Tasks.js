import React, { Component } from 'react';
import TaskItem from './TaskItem';

import {Panel} from 'muicss/react';

export class Tasks extends Component {
  changeHandler = (task, checked) => {
    this.props.onEditState(task, checked)
  }

  deleteItem = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    let tasks = <p style={{textAlign: 'center'}}>No tasks!</p>;

    if (this.props.tasks.length) {
      tasks = this.props.tasks.map(task => {
        return <TaskItem deleteItem={this.deleteItem} onEditState={this.changeHandler} key={task._id.$oid} task={task}  />
      });
    }

    return (
        <Panel>
          {tasks}
        </Panel>
    );
  }
}

export default Tasks;
