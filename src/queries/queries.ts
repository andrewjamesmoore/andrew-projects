export const getProjectsQuery = `
  query {
    projects {
      id
      title
      description
      status
      link
      url
      giturl
      tags
    }
  }
`;

export const getNotesQuery = `
  query {
    notes {
      id
      title
      description
      url
      date
    }
  }
`;
