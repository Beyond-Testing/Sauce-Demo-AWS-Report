# Sauce-Demo AWS Report

## Description

This project automates UI testing for the Sauce Demo application using Playwright, containerized with Docker, and managed through a CI/CD pipeline on GitHub Actions. Test results are uploaded to AWS S3, with notifications sent via email.

## Infrastructure

-   **Docker**: Containerizes the application for consistent testing environments.
-   **GitHub Actions**: Automates the CI/CD pipeline, including testing, artifact management, and deployment.
-   **AWS S3**: Stores Playwright test reports for easy access.

## Code Structure

-   **`.github/workflows/`**: Contains YAML files defining CI/CD pipelines.
-   **`src/`**: Source code for the application and test scripts.
-   **`Dockerfile`**: Specifies the Docker image configuration for running Playwright tests.
-   **`playwright.config.js`**: Configuration file for Playwright, defining test settings, browsers, and other options.

## Workflow YAML File

The project’s workflow includes:

-   **Checkout**: Pulls the latest code from the repository.
-   **Docker Setup**: Builds and saves a Docker image for testing.
-   **Run Tests**: Executes Playwright tests within the Docker container.
-   **Artifact Upload**: Saves test results and uploads them to AWS S3.
-   **Email Notification**: Sends a report link via email after the test completes.

## Test Architecture

The test architecture is designed to be scalable and maintainable, consisting of:

-   **Test Suites**: Group related tests, organized to reflect application features.
-   **Page Objects**: Encapsulate UI elements and actions, promoting reuse and reducing duplication.
-   **Fixtures**: Manage test environment setup and teardown, ensuring consistency across tests.
-   **Reporting**: Generates detailed HTML reports after test execution, which are stored on AWS S3 for review.

### Key Components

-   **Playwright**: Facilitates robust and reliable UI testing across multiple browsers.
-   **Docker**: Ensures tests run in isolated and consistent environments.
-   **GitHub Actions**: Orchestrates the testing pipeline, automating builds, tests, and deployments.
-   **AWS S3**: Provides scalable storage for test artifacts, accessible via generated URLs.

## Getting Started

### Prerequisites

-   Docker
-   Node.js
-   AWS Account with S3 setup
-   SMTP credentials for email notifications

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Beyond-Testing/Sauce-Demo-AWS-Report.git
    cd Sauce-Demo-AWS-Report
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build Docker image and run tests:
    ```bash
    docker build -t my-playwright-tests .
    docker run --rm -v $(pwd)/playwright-report:/usr/src/app/playwright-report my-playwright-tests
    ```
