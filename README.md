---

## Running the code

Once you have unzipped the folder and are ready to start, you can run `yarn` (or `npm install`) to install dependencies. After that, you can run:

```bash
# npm
npm run dev

# or yarn
yarn dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425.

You can see the client application running in your browser by going to http://localhost:5173/watch-list.

---

## Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.
   a. In case the WebSocket disconnects, we can manage it by subscribing to an RxJS WebSocket subject that updates the application state and UI in real-time. A status indicator can show the current data streaming status (e.g., "Connected," "Reconnecting," "Error"). To handle reconnections, we can implement a retry mechanism using RxJS's retry operator, with a defined delay and retry count. If retries fail, the data status changes to an "Error" state, and the user is informed via the UI. This approach ensures real-time data handling while providing feedback during disconnection

2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.
   a. If a user attempts to add the same instrument multiple times to their watchlist, we can handle this by introducing a validation layer that checks the user input before adding the instrument. Ideally, when a duplicate is detected, we can show an error message, such as "Instrument already exists in the watchlist." Additionally, to improve user experience, we can programmatically scroll to the existing entry using scrollIntoView, highlighting the instrument’s information within the UI to make it easily visible. This approach prevents duplicates and ensures a smooth, clear interaction for the user.

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?
   a.As the number of ISIN instruments in the watchlist grows significantly, mounting all of them in the browser DOM while continuously updating their values from the WebSocket can cause performance issues, leading to a sluggish or janky user interface.To address this, we can implement virtualization, where only a small subset of the list is mounted on the DOM at any given time. Elements are rendered on-demand as they come into view based on the user's scroll position. This reduces the number of active DOM elements, improving both rendering performance and UI responsiveness.Libraries like react-window or react-virtualized can be used to implement this efficiently, ensuring smooth performance even with large lists of instruments.

---

- KIND DISCLAIMER: I wasn't able to add as many test cases as I wanted due to time constraints. While I prioritized the core functionality, there are still a few test cases I intended to implement but couldn't due to the limited time available.

# TR investoDash - React TypeScript RxJS Vite SCSS Vitest Testing-Library Storybook

This is a React project using TypeScript and Webpack with server-side rendering (SSR) implemented via Node.js and Express. The project is designed with a strong focus on performance, scalability, and maintainability.

## Tech Stack

- **React**: For building dynamic user interfaces.
- **TypeScript**: Ensures static type checking for early error detection.
- **Vite**: Efficient bundling and asset management.
- **SCSS**: Utilizes tokens, mixins, and responsive design techniques for better styling and maintainability.
- **Storybook**: A UI component explorer that allows you to develop, test, and showcase components in isolation.

## Features

- **Typed with TypeScript**: The entire codebase is typed for early error detection and better maintainability.
- **Responsiveness**: Ensures the application works well on various screen sizes and devices.
- **Atomic Design Principles**: UI components are built using atomic design principles for consistency and reusability.
- **Modular Structure**: The app is divided into clear modules, making it easier to manage and scale.
- **Mise en Place File Structure**: Files that change together are grouped together for better organization.
- **Environment-Driven Configuration**: No magic strings; all configurations are managed via environment variables.
- **Error Handling**: Thorough handling of edge cases like errors, loading states, and empty states.
- **Accessibility**: Built with accessibility in mind, including keyboard navigation and screen reader support.
- **Linting and Formatting**: Enforces consistent code style with automated linting and formatting.
