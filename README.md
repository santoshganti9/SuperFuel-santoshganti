
## Technical Stack
- **Frontend**: React with React Router
- **Backend**: Express.js
- **Database**: PostgreSQL
- **UI Library**: ShadCN UI components

## Application Structure

### Frontend Pages
- **Snippet Creation Form** (`/create-snippet`)
  - Form for creating new JavaScript snippets
  - Input fields for snippet name and code

- **Snippet List** (`/`)
  - Table displaying all saved snippets
  - Navigation to view/edit individual snippets

- **Snippet Result** (`/view-snippet/:snippetId`)
  - Displays the execution result of a JavaScript snippet
  - Shows both the snippet code and its output

### Backend APIs
- **POST /api/jssnippet** - Save a new snippet to the database
- **GET /api/jssnippets** - Retrieve a list of all snippets
- **GET /api/jssnippet/:id** - Execute a snippet and return the result
- **PUT /api/jssnippet/:id** - Update an existing snippet

### Database Schema
**JSSnippet Table**
- **id** (UUID): Primary key
- **name** (String): Snippet name
- **jsSnippet** (Text): JavaScript code

## UI Components
- **Tables**: Display snippet list with interactive rows
- **Buttons**: Actions for creating, editing, and executing snippets
- **Forms**: Input fields with validation for snippet creation/editing

## Future Enhancements
- Pagination for the snippet list
- Better error handling and error boundaries
- Better UI
- Loading skeletons for async operations
- Button states (disabled during loading, etc.)