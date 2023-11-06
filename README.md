# gists-automation
Gists: Use the REST API to list, create, update and delete the public gists on GitHub.
# version
1.0.0

# Added
API tests are added:
- TC_01_creates a gist with a single file
- TC_02_creates a gist with multiple files
- TC_03_creates a public gist
- TC_05_attempts to create a gist without required fields
- TC_011_Updates contents of a file in a gist
- TC_013_adds a new file to an existing gist
- TC_015_attempts to update a gist that doesn’t exist
- TC_016_deletes an existing Gist
- TC_017_attempts to delete a non-existing gist
- TC_007_retrieves an existing gist by ID
- TC_006_lists public gists
- TC_008_lists gists for a autheticated user
- TC_010_attempts to retrieve a non-existing gist by ID

# Run tests
- Clone the repository to your local
  `git clone <repo link>`
- Install dependencies
  `npm install`
- Add the access token (GITHUB_TOKEN) to cypress.config.js file
- Run tests using:
  `npm run test:e2e`
