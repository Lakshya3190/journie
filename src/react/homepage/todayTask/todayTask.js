import React from "react";
import './todayTask.css';
import "tachyons";
import TodayTaskPortal from './todayTaskPortal/todayTaskPortal.js';


class todayTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addTaskVisibility: false,
            taskType: "",
            taskTitle: "",
            taskDesc: "",
            todayTaskData: [],
            userData: {}
        }

    }

    onTaskTypeChange = (event) => {
        this.setState({taskType: event.target.value})
    }

    onTaskTitleChange = (event) => {
        this.setState({taskTitle: event.target.value})
    }

    onTaskDesChange = (event) => {
        this.setState({taskDesc: event.target.value})
    }

    toggleAddTask = () => {
        this.setState({addTaskVisibility: !this.state.addTaskVisibility});
    }

    onSubmitTask = () => {
        const user = this.props.signedInUser
        fetch('http://localhost:3005/addToday', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userid: user,
                taskType: this.state.taskType,
                taskTitle: this.state.taskTitle,
                taskDesc: this.state.taskDesc
            })
        })
        .then((response => response.json()))
        .then(todayTaskData => {
            this.setState(Object.assign(this.state.todayTaskData, {todayTaskData: todayTaskData}))
        }) 
        console.log(this.state.todayTaskData)
    }

    onPageOpen = () => {
        const user = this.props.signedInUser
        console.log("The user is", user)
        fetch('http://localhost:3005/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userid: user,
            })
            })
            .then((response => response.json()))
            .then(todayTaskData => {
                this.setState(Object.assign(this.state.todayTaskData, {todayTaskData: todayTaskData}))
            }) 
            console.log("Today task data is:", this.state.todayTaskData)
    }

    componentDidMount = () => {
        this.onPageOpen();
    }

   

    render(){

        return(
            <div className = 'todayTask'>

                <TodayTaskPortal className = 'mt2' taskData = {this.state.todayTaskData}/>    

                <div onClick = {this.toggleAddTask} className = 'addTask_today pointer'>
                    +
                </div>

                <div className = 'add_dropdown' style = {{visibility: this.state.addTaskVisibility ? "visible" : "hidden"}}>
                    <input onChange = {this.onTaskTypeChange} type ="text" placeholder = "Task/Event" className = "input-field"></input>
                    <br/>
                    <input onChange = {this.onTaskTitleChange} type ="text" placeholder = "Title" className = "input-field"></input>
                    <br/>
                    <input onChange = {this.onTaskDesChange} type ="text" placeholder = "Description" className = "input-field"></input>
                    <br/>
                    <p onClick = {() => {this.toggleAddTask(); this.onSubmitTask()}} className = 'add-button pointer'>Add</p>
                </div>

                


            </div>
        );
    }
}

export default todayTask;