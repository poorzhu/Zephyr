import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTasks, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskDate from './task_date';
import SubtaskIndex from './subtask_index';

class TaskEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: { ...this.props.task },
    };

    this.handleInput = this.handleInput.bind(this);
    this.createSubtask = this.createSubtask.bind(this);
    this.closeModalEsc = this.closeModalEsc.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
  }

  handleInput(type) {
    return (e) => {
      const task = this.state.task;
      task[type] = e.target.value;

      this.setState({ task }, () => {
        this.handleSubmit();
      });
    };
  }

  handleSubmit() {
    this.props.updateTask(this.state.task);
  }

  createSubtask(type) {
    const activeSubtaskId = Number(document.activeElement.classList[1]);

    // prevent extra inputs
    document.activeElement.blur();

    const { task, createTask, updateTask } = this.props;
    const newSubtask = {
      name: '',
      column_id: task.column_id,
    };

    createTask(newSubtask).then((result) => {
      const subtask = result.task;
      const updatedTask = task;

      if (type === 'task') {
        updatedTask.subtask.unshift(subtask.id);
      } else if (type === 'subtask') {
        const activeSubtaskIdIndex = updatedTask.subtask.indexOf(activeSubtaskId);
        updatedTask.subtask.splice(activeSubtaskIdIndex + 1, 0, subtask.id);
      }

      updateTask(updatedTask).then((result) => {
        this.setState({ task: updatedTask }, () => {
          const newTaskElement = document.getElementsByClassName(`task-edit-subtask-name ${subtask.id}`)[0];
          newTaskElement && newTaskElement.focus();
        });
      });
    });
  }

  handleDeleteTask() {
    const { task, deleteTask, updateColumn, column, closeModal, history } = this.props;
    const { params } = this.props.match;

    const updatedColumn = column;
    const index = updatedColumn.task.indexOf(task.id);
    updatedColumn.task.splice(index, 1);
    updateColumn(updatedColumn).then(() => {
      closeModal();
      deleteTask(task.id).then(() => {
        history.push(`/1`);
        history.push(`/${params.workspaceId}/${params.projectId}`);
      });
    });
  }

  closeModalEsc() {
    $(document).keydown((e) => {
      if (e.keyCode == 27) {
        this.props.closeModal();
      }
    });
  }

  closeModal() {
    const workspaceId = this.props.match.params.workspaceId;
    const projectId = this.props.match.params.projectId;
    this.props.history.push(`/${workspaceId}/${projectId}`);
    this.props.closeModal();
  }

  toggleCompleted() {
    const { task, updateTask } = this.props;
    const updatedTask = task;

    updatedTask.completed = !task.completed;

    this.setState({ task: updatedTask }, () => updateTask(updatedTask));
  }

  render() {
    const { closeModal, deleteTask, updateTask, tasks } = this.props;
    const { task } = this.state;
    let completed;

    // task.completed -> move to separate component
    if (task.completed === false) {
      completed = (
        <button
          className="btn task-edit-incomplete"
          onClick={this.toggleCompleted}
        >
          <FontAwesomeIcon icon={faCheck} className="task-edit-check" />
          <div className="task-edit-mark-complete">Mark Complete</div>
        </button>
      );
    } else {
      completed = (
        <button
          className="btn task-edit-complete"
          onClick={this.toggleCompleted}
        >
          <FontAwesomeIcon icon={faCheck} className="task-edit-check" />
          <div className="task-edit-completed">Completed</div>
        </button>
      );
    }

    return (
      <div className="task-edit-form">
        <div className="task-edit-top">
          {completed}
          <div className="task-edit-top-right">
            <div>
              <FontAwesomeIcon
                icon={faTrash}
                className="task-edit-delete"
                onClick={() => this.handleDeleteTask()}
              />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faTasks}
                className="task-edit-new-subtask"
                onClick={() => this.createSubtask("task")}
              />
            </div>
            <div onClick={closeModal} className="task-edit-cross">
              ×
            </div>
          </div>
        </div>
        <div className="task-edit-header">
          <input
            className="task-edit-name"
            type="text"
            value={task.name}
            placeholder="Write a task name"
            onChange={this.handleInput("name")}
          />
          <div className="task-edit-header-sub">
            <TaskDate {...this.props} task={task} updateTask={updateTask} />
          </div>
        </div>
        <SubtaskIndex
          task={task}
          tasks={tasks}
          updateTask={updateTask}
          createSubtask={this.createSubtask}
          deleteTask={deleteTask}
        />
        <div className="task-edit-border" />
        <div className="task-edit-description-container">
          <FontAwesomeIcon
            icon={faGripLines}
            className="task-edit-description-icon"
          />
          <textarea
            className="task-edit-description"
            type="text"
            value={task.description || ''}
            onChange={this.handleInput('description')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(TaskEditModal);
