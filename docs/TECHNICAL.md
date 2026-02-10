# Technical Documentation

## Project Structure

The application follows a strict MVVM structure to keep responsibilities explicit and traceable.

```
src/
  components/
    layout/
  models/
  routes/
  services/
  tests/
  viewmodels/
  views/
  App.jsx
  main.jsx
```

- `models/`: Domain classes (no UI logic).
- `services/`: HTTP access layer to RAWG.
- `viewmodels/`: State, transformations, and coordination between views and services.
- `views/`: Page-level JSX components responsible for rendering only.
- `components/`: Reusable presentational pieces.
- `routes/`: Route declarations.

## MVVM Architecture

- **Model**: `Videogame` maps RAWG responses into a predictable shape. It only contains data and domain-related getters.
- **ViewModel**: Hooks like `useVideogameListViewModel` orchestrate data loading, filtering, and state transitions. Side effects are handled in `useEffect` with cleanup via `AbortController`.
- **View**: Pages such as `HomeView` and `VideogameDetailView` focus on rendering. They do not call the API directly and receive all behavior from the ViewModel.


## Routing Strategy

`react-router-dom` drives SPA navigation. Routes are defined in `AppRoutes` with:

- `/` for the list view
- `/games/:gameId` for details
- `*` for 404

Layout is shared through `MainTemplate`, to share header and footer across all pages.

## CSS Strategy

A single global stylesheet (`src/index.css`) defines:

- A color palette and typography rules
- Shared spacing tokens
- Component-level classes


## API Integration

All requests go through `services/rawgService.js`. The service:

- Centralizes the base URL and query parameters
- Requires `VITE_RAWG_API_KEY` and throws an error if it is missing
- Throws clear errors when requests fail

ViewModels consume the service and map API data into `Videogame` instances.

## State Management

State stays local to the ViewModel hooks. The list view manages:

- `games` loaded from RAWG
- `filters` for name and genre
- `genres` derived from RAWG `/genres`
- `viewMode` for card vs list layout
- `page` and `hasNextPage` for pagination
- `status` and `error` states

Filtering is server-side. The list ViewModel requests RAWG each time filters are applied, sending `search` and `genres` parameters. Genre options are pulled from `/genres` and mapped from name to slug to align with the API.

## Testing Approach

- **Services**: validate query parameter handling and response parsing.
- **ViewModels**: verify loading flow and client-side filtering logic.
- **Components**: basic render tests for key UI elements.
