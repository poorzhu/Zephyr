import { connect } from 'react-redux';
import ColumnIndexItem from './column_index_item';
import {
  requestColumn,
  requestColumns,
  deleteColumn,
  updateColumn,
  createColumn
} from '../../actions/column_actions';

import { requestProject, updateProject } from '../../actions/project_actions';
import { updateTask, requestTasks } from "../../actions/task_actions";

const mapStateToProps = (state, ownProps) => {
  return {
    column: ownProps.columns[ownProps.column.id],
  };
};

const mapDispatchToProps = dispatch => ({
  requestColumns: project_id => dispatch(requestColumns(project_id)),
  requestColumn: id => dispatch(requestColumn(id)),
  createColumn: (project_id, column) =>
    dispatch(createColumn((project_id, column))),
  updateColumn: column => dispatch(updateColumn(column)),
  deleteColumn: id => dispatch(deleteColumn(id)),
  requestProject: id => dispatch(requestProject(id)),
  requestTasks: columnId => dispatch(requestTasks(columnId)),
  updateProject: project => dispatch(updateProject(project)),
  updateTask: task => dispatch(updateTask(task))
});

export default connect(
  mapStateToProps,
  null
)(ColumnIndexItem);