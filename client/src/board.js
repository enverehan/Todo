import React from 'react'
import axios from 'axios'

class Board extends React.Component {

    constructor(props) {
        super(props);

        /**/
        this.state = {
            tasks : [],
            defaultNewTaskValue : ''
        }

        this.getTasks();

    }

    async getTasks() {
        await axios.get("http://localhost:9000/board").then(function( result ) {
            var state_variable = [];
            for( var i=0; i<result.data.length; i++ ) {
                state_variable.push( [{ type: result.data[i].type, taskDesc: result.data[i].taskDesc }] );
            }
            console.log (state_variable);
        });
    }

    /** Change type of the list item */
    changeType( target ) {
        var target_type = target.target.getAttribute('data-type');
        var target_key = target.target.getAttribute('data-key');
        var state_tasks = this.state.tasks;

        target_type === 'completed' ? state_tasks[target_key][0].type = 'waiting' : state_tasks[target_key][0].type = 'completed';
        this.setState({tasks : state_tasks });
    }

    /** Delete the list item */
    deleteItem( target ) {
        var target_key = target.target.getAttribute('data-key');
        var state_tasks = this.state.tasks;
        state_tasks.splice(target_key, 1);

        this.setState({tasks : state_tasks });
    }

    /** Send Data */
    async sendData( data ) {
        return await axios.post("http://localhost:9000/board/" + data.action, data );
    }

    /** Add new task */
    addNewTask( target ) {

        if( target.keyCode === 13 ) {
            var will_be_added = target.target.value;
            var task_type = target.target.getAttribute('data-type');

            var state_tasks = this.state.tasks;
            state_tasks.push( [{ type: task_type, taskDesc: will_be_added }] );

            // Add the new data to database
            var data = { type: task_type, taskDesc: will_be_added, action: "add" }
            this.sendData( data );

            this.setState({tasks : state_tasks });

            target.target.value = '';

        }

    }

    taskItem( type="waiting" ) {

        const items = []

        for( var i = 0; i < this.state.tasks.length; i++ ) {
            if( this.state.tasks[i][0].type !== type ) { continue; }

            var item_fa_class = '';
            switch( this.state.tasks[i][0].type ) {
                case 'waiting':
                item_fa_class = 'fas fa-check';
                break;

                case 'completed':
                item_fa_class = 'fas fa-minus';
                break;

                default:
                item_fa_class = 'fas fa-check';
                break;
            }

            items.push(
                <li key={i} className="d-flex justify-content-between">
                    <div>
                        {this.state.tasks[i][0].taskDesc}
                    </div>
                    <span className="text-muted">
                        <i onClick={this.changeType.bind(this)} data-key={i} data-type={this.state.tasks[i][0].type} className={item_fa_class}>&nbsp;</i>
                        <i onClick={this.deleteItem.bind(this)} data-key={i} className="far fa-trash-alt">&nbsp;</i>
                    </span>
                </li>
            )
        }

        return items;

    }




    render() {

      return (
          <div>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <a href="/board"><h1><i className="fas fa-check-double"></i> Todo App</h1></a>
                        </div>
                        <div className="col-6 text-right">
                            <nav>
                                <ul>
                                    <li><a href="/logout">Log Out</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row main-row">
                    <div className="col-md-6">
                        
                        <div className="alert alert-primary">Waiting Tasks</div>
                        <div className="task-groups">
                            <ul>
                                {this.taskItem( "waiting" )}
                            </ul>
                            <input onKeyUp={this.addNewTask.bind(this)} data-type="waiting" className="form-control" name="new-waiting-task" placeholder="Your new task" />
                        </div>

                    </div>
                    <div className="col-md-6">

                        <div className="alert alert-success">Completed Tasks</div>
                        <div className="task-groups">
                            <ul>
                                {this.taskItem( "completed" )}
                            </ul>
                            <input onKeyUp={this.addNewTask.bind(this)} data-type="completed" className="form-control" name="new-completed-task" placeholder="Your new task" />
                        </div>

                    </div>
                </div>
            </div>
          </div>

        )
    }

}

export default Board