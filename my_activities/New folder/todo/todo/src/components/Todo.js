import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {id: 1, task: 'Task no 1'}, 
                {id:2, task:'Task no 2'}, 
                {id:3, task:'Task no 3'}
            ],
            currTask: ''
        }
    }
    
    handleInput =(e)=>{
        let cval = e.target.value;
        this.setState({currTask: cval})
    }

    addingTask=()=>{
        const nta = [...this.state.tasks, {id: this.state.tasks.length + 1, task: this.state.currTask}]
        this.setState({
            tasks : nta,
            currTask: ''
        });
    }

    onDelete = (id)=>{
        const nta = this.state.tasks.filter(obj =>{
            return obj.id !== id
        })
        this.setState({
            tasks : nta
        })
    }
    render() {
        return (
            <>
                <Input currTask= {this.state.currTask} handleInput={this.handleInput} addingTask={this.addingTask}/>
                <Tasklist tasks = {this.state.tasks} onDelete={this.onDelete}/>
            </>
        )
    }
}

class Input extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="main">
                <input onChange={this.props.handleInput} value={this.props.currTask} type="text" />
                <button onClick={this.props.addingTask}>Add</button>
            </div>
        )
    }
}

class Tasklist extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="tasks">
                <ul>
                    {
                        this.props.tasks.map(task=>(
                            <li key={task.id}>
                                <h2>{task.task}</h2>
                                <button onClick={()=>this.props.onDelete(task.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
