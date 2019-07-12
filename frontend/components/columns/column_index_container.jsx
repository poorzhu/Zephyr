import { connect } from 'react-redux';
import ColumnIndex from './column_index';
import {
  requestColumn,
  requestColumns,
  deleteColumn,
  updateColumn,
  createColumn
} from '../../actions/column_actions';

import { requestProject, updateProject } from '../../actions/project_actions';

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.projectId;
  
  // better way to handle undfined?
  let columnsArray
  if (state.entities.projects[projectId] === undefined) {
    columnsArray = []
  } else {
    columnsArray = state.entities.projects[projectId].column
  };

  return {
    project: state.entities.projects[projectId],
    columns: state.entities.columns,
    columnsArray: columnsArray
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
  updateProject: project => dispatch(updateProject(project))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnIndex);