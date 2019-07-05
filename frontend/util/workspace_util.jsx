export const fetchWorkspaces = () => (
  $.ajax({
    method: `GET`,
    url: `api/workspaces`
  })
);

export const fetchWorkspace = id => (
  $.ajax({
    method: `GET`,
    url: `api/workspaces/${id}`
  })
);

export const createWorkspace = workspace => (
  $.ajax({
    method: `POST`,
    url: `api/workspaces`,
    data: { workspace }
  })
);

export const updateWorkspace = workspace => (
  $.ajax({
    method: `DELETE`,
    url: `api/workspaces/${id}`,
    data: { workspace }
  })
);

export const deleteWorkspace = id => (
  $.ajax({
    method: `DELETE`,
    url: `api/workspaces/${id}`
  })
);
