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
