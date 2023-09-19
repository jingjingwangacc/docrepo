# Doc Repo Task Breakdown.

## Stage 1: Design Database Schema

- Prepare a postgreSQL database on ElephantSQL.
    
- Design database schema for each table.

## Stage 2: Basic Submissions (without Files or Comments)

### Functionalities

In this stage, we will implement the following functionalities:

1. Create a new submission (without files) with the following info:
    - Author Id (e.g., can be hard-coded at beginning);
    - Descriptions;
    - Assign reviewers;
    - Automatically assign submission Id, submission creation time.

2. View details of a given submission (look up by submission Id).

3. (Optional) Edit submission details. Modify descriptions / reviewer list.

4. Approve a submission that is assigned to the current user.

5. Submit a submission that has been approved by reviewers.

### Backend

Implement the following in backend server:

1. Model: wrap submission-related SQL operations / queries into functions in a "submission model".

2. Controller: implement "submission controller" functions that each can perform a well-defined operation on a submission (e.g., create a submission, edit a submission, get a submisison's details, approve a submission, submit a submission).

3. Route: handle POST, GET, PATCH, PUT requests to a URL (e.g., "/submission"), define their meanings (e.g., POST = create a submission, GET = view details, PATCH = approve or submit, PUT = edit), and their request body / response body formats.

### Frontend

Implement the following in frontend:

1. A "create submission" page that can input basic submission info.

2. A "view submission" page to show a submission's details, including a button to edit the submission and a button to submit the submission (if I'm the author), and a button to approve a submission (if I'm the reviewer).

3. An "edit submission" page (maybe can reuse "create submission" page?) that can update the submission info.

## Stage 3: Add PDF Files to Submission

### Functionalities

We will add the following functionalities:

1. When creating the submission, user can upload one or multiple PDF files to the server. Server will store these files in a temporary folder. These files are "attached" to the submission.
    - For simplicity, in the initial version, the server can just create one folder for each submission (we don't allow users to choose which server folder to store the file). In later version, we can let users choose which server folder to store the files.

2. When viewing the detail of a submission, load the PDF file(s) and show them in the page in an embed div.

3. When submitting a submission, move the file from the temporary folder to the final destination.

### Backend

Implement the following in backend server:

1. New model: note that when uploading a file, the server not only needs to store the actual file in a server folder, but it also needs to store some file metadata (e.g., a unique file Id, file's temporary location & final location) in the database. So we shall wrap file-metadata related SQL queries / operations into functions in a new "File" model.

2. New controller: implement file related functionalities (e.g., handle a file upload, move file from folder A to folder B) in a controller.

3. New route: handle "upload file" request, e.g., it can be a POST request to a URL (e.g., "/file"). Define the request / response body format.

4. In "create submission" logic: attach file Ids to the submission.

5. In "submit submission" logic: move files from the temp folder to the final folder.

6. Make sure the "static handler" can handle GET on files (to download files).

### Frontend

Implement the following in frontend:

1. In "create submission" page: add a "upload file" button to allow users browse files in their computer.

2. When user clicks "create submission", we may need to first upload the files to the server. Only call backend's "create submission" API after all files are uploaded.
    - Alternatively, the frontend can immediately start file upload once the user chooses a file.

3. In "view submission" page: find a way to show the attached PDF files in an embed div.

## Stage 4: Comments

### Functionlaities

We will add the following functionalities:

1. Allow users (author / reviewers) to leave comment on a pending submission.

2. When viewing a submission, it also shows all the comments on the submission.

3. (Optional) Each submisison can have a "need action" option. When set to "need action", the comment must be resolved (e.g., replied) before the submission can go in.

### Backend

1. Define new models to hold all comment related SQL queries / operations.

2. Define controller functions to add / get comments.

3. Implement route to handle POST / GET requests to add / get comments.

### Frontend

1. In "view submission" page, allow users to add comments.

2. In "view submission" page, show all existing comments.

## Stage 5: User Dashboard

### Functionalities

We will add the following functionalities:

1. When a user logs in, it directs to a "user dashboard" page with the following information:
    - Submissions pending for the user's review.
    - Pending submissions authored by the user.
    - Recently submitted submissions authored by the user.

