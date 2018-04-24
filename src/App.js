import React, { Component } from 'react';
import axios from 'axios';

import {Appbar, Container, Button} from 'muicss/react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Loader from './components/Loader';

import './App.css';

class App extends Component {
  state = {
    tasks: [],
    isLoading: false
  }

  componentWillMount() {
    this.getTasks()
  }

  getTasks() {
    this.setState({isLoading: true});
    axios.get('https://api.mlab.com/api/1/databases/reacttasks/collections/tasks?apiKey=lVlncIBGmW9BqnaIbYPSC_HmOa4aTbff')
    .then(resp => {
      this.setState({tasks: resp.data, isLoading: false});
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  changeHandler = (task, checked) => {
    this.setState({isLoading: true});
    axios.put('https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/' + task._id.$oid + '?apiKey=lVlncIBGmW9BqnaIbYPSC_HmOa4aTbff', {
        text: task.text,
        complete: checked
    })
    .then(resp => {
      let newTasks = [...this.state.tasks].map(testTask => {
        if (testTask._id.$iod === task._id.$iod) {
          task.complete = checked;
        }
        return testTask;
      });

      this.setState({tasks: newTasks, isLoading: false});
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  addTask = (value) => {
    this.setState({isLoading: true});
    let newTasks = [...this.state.tasks]
    axios.post('https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/?apiKey=lVlncIBGmW9BqnaIbYPSC_HmOa4aTbff', {
      text: value,
      complete: false
    })
    .then(resp => {
      newTasks.push({
        _id: resp.data._id,
        text: value,
        complete: false
      });
      this.setState({tasks: newTasks, isLoading: false});
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  removeCompleted = () => {
    this.setState({isLoading: true});
    let newTasks = [...this.state.tasks]
    this.state.tasks.forEach((task, i) => {
      if (task.complete) {
        newTasks.splice(i + (newTasks.length - this.state.tasks.length), 1);
        axios.delete('https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/' + task._id.$oid + '?apiKey=lVlncIBGmW9BqnaIbYPSC_HmOa4aTbff')
        .then(resp => {

        })
        .catch(err => {
          console.log(err.message);
        })
      }
    });

    this.setState({tasks: newTasks, isLoading: false});
  }

  deleteItem = (id) => {
    this.setState({isLoading: true});
    let newTasks = [...this.state.tasks]
    this.state.tasks.forEach((task, i) => {
      if (task._id.$oid === id) {
        newTasks.splice(i, 1);
        axios.delete('https://api.mlab.com/api/1/databases/reacttasks/collections/tasks/' + id + '?apiKey=lVlncIBGmW9BqnaIbYPSC_HmOa4aTbff')
        .then(resp => {
          this.setState({tasks: newTasks, isLoading: false});
        })
        .catch(err => {
          console.log(err.message);
        })
      }
    });
  }

  render() {
    let loader = null;

    if (this.state.isLoading) {
      loader = <Loader />;
    }

    return (
      <div className="App">
        <Appbar style={{marginBottom: '30px'}}>
          <Container>
            <table width="100%">
             <tbody>
               <tr>
                 <td><h3>React Tasks</h3></td>
               </tr>
             </tbody>
            </table>
          </Container>
        </Appbar>
        <Container>
          <AddTask onAddTask={this.addTask} />
          <Tasks
            deleteItem={this.deleteItem}
            onEditState={this.changeHandler}
            tasks={this.state.tasks} />
          <div className="button-wrapper">
            <Button onClick={this.removeCompleted} color="danger">Delete completed</Button>
          </div>
        </Container>
        {loader}
      </div>
    );
  }
}

export default App;
