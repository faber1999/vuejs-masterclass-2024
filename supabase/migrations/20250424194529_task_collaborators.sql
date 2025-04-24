
DROP TABLE IF EXISTS task_collaborators;

CREATE TABLE task_collaborators (
  task_id bigint REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (task_id, profile_id)
);