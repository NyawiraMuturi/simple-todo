# simple-todo
<img width="1264" alt="Screenshot 2025-04-22 at 8 12 21 PM" src="https://github.com/user-attachments/assets/2b108c21-d0f5-4e99-9adc-eee979806d39" />

## Overview

The task was to build a collaborative todo app like Trello, Jira, Asana etc. The core tasks were:

- Please describe (in any form you like - document, words, pseudo-code, slides, whatever) what you think should be the most important features to add to this app in the process of building a group todo app.
- Refactor class components to functional components.
- Pick a feature (or more) from step 1 above (ex: add tags, assigning users, having multiple lists, adding comments, organizing projects) and implement it
- Add automated tests (whatever framework you want) to test the feature(s), as well as any other non functional requirements you’d like to cover.

---

## Table of contents[![](/public/pin.svg)](#table-of-contents)

- [Approach](#approach)
- [Additional Features](#additional-features)
- [Dependencies](#dependencies)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Conclusion](#conclusion)

---

## Approach

1. **Project Setup**: I initialized a react project using Vite and set up prettier, tailwind and ESLint for better developer experience writing clean and maintainable code.
2. **Data Fetching**: I used Prop and event handlers to allow parent-child data movement.
3. **User Interface**: I used TailwindCSS to Design and build clean and intuitive user interfaces across all pages.
4. **State Management**: Implemented state management using either local component state (useState), useContext for global state management, and local storage for data persistence.
5. **Javascript strict mode**: Leveraged strict mode to add type safety and enhance code readability and maintainability across the entire app.

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

---

## Additional Features

As per the project instructions, there was room to go above the expected outcome. In addition to the core requirements, I implemented the following features:

- Drag and drop feature to help manage todo statuses with ease


<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

---

## Dependencies[![](/public/pin.svg)](#dependencies)

I have been very mindful of the dependencies I used in the project. Here is the non-exhaustive list of the dependencies I included for your quick glance.

- React 19
- TailwindCSS - CSS library
- dnd-kit - drag and drop library
- cypress - e2e testing library

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

---

## Performance Optimization[![](/public/pin.svg)](#performance-optimization)

I implemented performance optimizations in the application to improve speed and efficiency, including:

1. **Code Splitting**: Leveraged code splitting techniques to split the application into smaller, more manageable chunks. Resulting in faster load times and better resource utilization.

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

---

## Testing[![](/public/pin.svg)](#testing)

I am a firm believer of writing tests to ensure the quality and reliability of applications. However, for this task, since it was not directly stipulated in the project instructions, I decided to implement the following:

1. **e2e testing with cypress**: I wrote one test suite for the main (/) page.

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>


---

## Conclusion[![](/public/pin.svg)](#screenshots)

I hope you have as much fun reviewing this submission as I did working on it.

I really appreciate the chance to demonstrate my abilities and look forward to the feedback from the Subscript team.

If you have any questions or feedback regarding my submission, please feel free to reach out via the provided contact information.

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

---
