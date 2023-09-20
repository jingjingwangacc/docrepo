DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.submissions;
DROP TABLE IF EXISTS public.files;
-- DROP TABLE IF EXISTS public.fileversions;
DROP TABLE IF EXISTS public.comments;
-- DROP TABLE IF EXISTS public.projects;
DROP TYPE IF EXISTS submission_state;

/* A user of the system */
CREATE TABLE public.users (
    user_id BIGSERIAL UNIQUE NOT NULL,
    user_name VARCHAR(32),
    user_pwd VARCHAR(32),
    PRIMARY KEY(user_id)
) WITH (
  OIDS=FALSE
);

CREATE TYPE submission_state AS ENUM ('created', 'pending', 'submitted');

/* A submission */
CREATE TABLE public.submissions (
    submission_id BIGSERIAL UNIQUE NOT NULL,
    submission_state submission_state NOT NULL,
    author_id BIGINT NOT NULL,
    reviewer_ids BIGINT[],
    approved_reviewer_ids BIGINT[],
    -- project_id BIGINT,
    submission_description VARCHAR(16384),
    creation_timestamp TIMESTAMP NOT NULL,
    submission_timestamp TIMESTAMP,
    files BIGINT[],
    -- file_versions BIGINT[],
    comments BIGINT[],
    PRIMARY KEY(submission_id)
) WITH (
  OIDS=FALSE
);

/* A file in repo */
CREATE TABLE public.files (
    file_id BIGSERIAL UNIQUE NOT NULL,
    repo_path VARCHAR(1024) UNIQUE NOT NULL,
    submission_state SUBMISSION_STATE NOT NULL,
    file_checksum VARCHAR(32),
    pending_path VARCHAR(1024),
    -- current_version BIGINT NOT NULL,
    -- past_versions BIGINT[],
    PRIMARY KEY(file_id)
) WITH (
  OIDS=FALSE
);

/* A submitted or pending version of a file */
-- CREATE TABLE public.fileversions (
--     file_id BIGINT NOT NULL,
--     version_id BIGINT NOT NULL,
--     submission_id BIGINT NOT NULL,
--     pending_path VARCHAR(1024),
--     submission_state SUBMISSION_STATE NOT NULL,
--     file_checksum VARCHAR(32),
--     PRIMARY KEY(file_id, version_id)
-- ) WITH (
--   OIDS=FALSE
-- );

/* A comment on a submission */
CREATE TABLE public.comments (
    submission_id BIGINT NOT NULL,
    comment_id BIGINT NOT NULL,
    commenter_id BIGINT NOT NULL,
    creation_timestamp TIMESTAMP NOT NULL,
    comment VARCHAR(16384),
    resolved BOOLEAN NOT NULL,
    PRIMARY KEY (submission_id, comment_id)
) WITH (
  OIDS=FALSE
);

/* A project */
-- CREATE TABLE public.projects (
--     project_id BIGINT NOT NULL,
--     project_name VARCHAR(64) NOT NULL,
--     owner_id BIGINT NOT NULL,
--     contributor_id BIGINT[],
--     project_description VARCHAR(16384),
--     submission_ids BIGINT[],
--     PRIMARY KEY(project_id)
-- ) WITH (
--   OIDS=FALSE
-- );