import React, { Component } from 'react';
import { Button, Layout, Input, Space, Card  } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Sider, Footer } = Layout;

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {id: 1, task: 'Task no 1'}, 
                {id:2, task:'Task no 2'}, 
                {id:3, task:'Task no 3'}
            ],
            
        }
    }

    addingTask=(task)=>{
        const nta = [...this.state.tasks, {id: this.state.tasks.length + 1, task: task}]
        this.setState({
            tasks : nta
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
                <Layout>
                    <Header style={{ backgroundColor:'#40a9ff'}}>
                        <InputBox addingTask={this.addingTask} style={{float: 'right'}}/>
                    </Header>
                    <Layout>
                        <Sider level={1} style={{color:'white', minHeight: 620}}>SideBar</Sider>
                        <Layout>
                            <Content>
                                <Tasklist tasks = {this.state.tasks} onDelete={this.onDelete}/>
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer style={{backgroundColor:'#40a9ff', textAlign: 'left'}}>
                        <FooterItem/>
                    </Footer>
                </Layout>
            </>
        )
    }
}

class FooterItem extends Component{

    render(){
        return(
            <>
                <h1>Demo project by Pradeep Singh</h1>
            </>
        
        )}
}
class InputBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            currTask : ''
        }
    }

    handleInput =(e)=>{
        let cval = e.target.value;
        this.setState({currTask: cval})
    }
    render() {
        return (
            <div className="main">
                <Input onChange={this.handleInput} value={this.state.currTask} type="text"  style={{ width: 200, marginRight: 10, textAlign:'center' }}/>
                <Button style={{backgroundColor: '#fff2e8'}} onClick={()=>{
                    if(this.state.currTask !== ''){
                        this.props.addingTask(this.state.currTask);
                        this.setState({currTask : ''})
                    }
                }} shape="round">Add</Button>
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
                            <Space key={task.id} direction="horizontal">
                                <Card key={task.id} title="Card" style={{ width: 300 , margin: 20}}>
                                    <li key={task.id}>
                                        <h2>{task.task}</h2>
                                        <Button shape="round" onClick={()=>this.props.onDelete(task.id)}>Delete</Button>
                                    </li>
                                </Card>
                            </Space>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
