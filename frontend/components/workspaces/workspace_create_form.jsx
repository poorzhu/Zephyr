import React from "react";
import { Link, withRouter } from "react-router-dom";

class WorkspaceCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.closeModalEsc();
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.setState({ name: "Company or Team Name" });
    }
  }

  handleInput(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .createWorkspace(this.state)
      .then(result => this.props.history.push(`/${result["workspace"].id}`))
      .then(this.props.closeModal);
  }

  closeModalEsc() {
    const closeModal = this.props.closeModal;
    $(document).keydown(function(e) {
      if (e.keyCode == 27) {
        closeModal();
      }
    });
  }

  renderErrors() {
    if (this.props.errors.workspace !== undefined) {
      return (
        <ul className="errors-workspace">
          {this.props.errors.workspace.map((error, i) => (
            <ul key={`error-${i}`}>
              {error}
            </ul>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="workspace-form-container">
        <div className="workspace-form-header">
          <h2>Create Your Workspace</h2>
          <div
            onClick={this.props.closeModal}
            className="workspace-form-cross"
          >
            ×
          </div>
        </div>
        <form className="workspace-form">
          <label>
            <p>Workspace Name</p>
            <input
              placeholder="Company or Team Name"
              type="text"
              value={this.state.name}
              onChange={this.handleInput("name")}
            />
            {this.renderErrors()}
          </label>
          <button
            onClick={this.handleSubmit}
            className="workspace-form-button"
          >
            Create Workspace
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(WorkspaceCreateForm);