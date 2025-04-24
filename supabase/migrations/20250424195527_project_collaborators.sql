
DROP TABLE IF EXISTS project_collaborators;

CREATE TABLE project_collaborators (
  project_id bigint REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (project_id, profile_id)
);