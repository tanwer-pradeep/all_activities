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
            <div className="main">
                <input onChange={this.handleInput} value={this.state.currTask} placeholder='Enter your task' type="text" />
                <button onClick={this.addingTask}>Add</button>

            </div>
            <div className="tasks">
                <ul>
                    {
                        this.state.tasks.map(task=>(
                            <li key={task.id}>
                                <h2>{task.task}</h2>
                                <button onClick={()=>this.onDelete(task.id)}>Delete</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            </>
        )
    }
}
