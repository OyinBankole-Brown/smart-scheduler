# AI Smart Scheduler

**Live Demo:** [https://oyintm.netlify.app/](https://oyintm.netlify.app/)

A full-stack productivity application that leverages Generative AI (Google Gemini 2.5) to automatically decompose complex tasks into actionable, bite-sized sub-steps. Built to streamline time management and reduce decision paralysis.

## Features
* **AI-Powered Breakdown:** Integrates Google's Gemini 2.5 Flash model to analyze task complexity and generate logical sub-tasks.
* **Smart Task Management:** Create, track, and manage tasks with a persistent MongoDB database.
* **Real-time Interaction:** Responsive React frontend with instant loading states and feedback.
* **Cloud Architecture:** Decoupled architecture with a Node.js/Express backend hosted on Render and a React frontend on Netlify.

## Tech Stack
* **Frontend:** React.js, CSS3, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **AI Engine:** Google Gemini API (v2.5 Flash)
* **Deployment:** Netlify (Client) & Render (Server)

## Getting Started Locally

### Prerequisites
* Node.js installed
* MongoDB Connection String
* Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/OyinBankole-Brown/smart-scheduler.git](https://github.com/OyinBankole-Brown/smart-scheduler.git)
    cd smart-scheduler
    ```

2.  **Setup Backend**
    ```bash
    cd server
    npm install
    ```
    * Create a `.env` file in the `server` folder:
        ```env
        MONGO_URI=your_mongodb_connection_string
        GEMINI_API_KEY=your_google_api_key
        PORT=5000
        ```
    * Start the server:
        ```bash
        node index.js
        ```

3.  **Setup Frontend**
    * Open a new terminal.
    * Navigate to the client folder:
        ```bash
        cd client
        npm install
        npm start
        ```

## Future Improvements
* [ ] User Authentication (JWT/OAuth)
* [ ] Drag-and-drop task reordering
* [ ] Voice-to-text task entry
* [ ] Calendar integration (Google/Outlook)

## Author
**Oyin Bankole-Brown**
* [Portfolio](https://oyinbankole-brown.netlify.app)
* [LinkedIn](https://www.linkedin.com/in/oyinbankolebrown/)