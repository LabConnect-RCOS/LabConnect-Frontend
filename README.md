# Welcome to LabConnect (Frontend)
Team: Rafael Cenzano, Sagar Sahu, Will Broadwell

This README is meant to serve as documentation for users and developers to explore the LabConnect application on their down device. Below you will find detailed setup instructions as well as more information about the product and its intended purpose, as well as some important links and guides. Enjoy!

All open-source contributions for LabConnect can be found at the following link: https://github.com/LabConnect-RCOS.

## What's LabConnect?
LabConnect is a platform dedicated to bridging the gap between students and research opportunities. We aim to make it easier for students to find meaningful lab/research work while helping professors connect with passionate individuals through a convenient, all-in-one application. Our team is hard at work, and we will provide updates on our progress so keep an eye out for announcements! Currently, we're putting some final touches on our product and hope to release it university-wide in the upcoming fall semester.

If you're interested in learning more about the team at RCOS or are thinking about joining LabConnect or any branch of RCOS, please check out the new website here to learn more about existing projects and areas of interest: https://new.rcos.io/.

## Some New Stuff
This semester, our team has made a lot of progress in finetuning the application and correctly syncing the backend and frontend. A few of the new contributions made are:
1. A brand new, remade UI catered towards students
2. Convenient features and toggles, such as dark mode, to accommodate for different user preferences
3. Revamped opportunities and listing pages
4. Functioning backend with PostgreSQL database for departments, professors, and opportunities
5. Advances filtering for facotrs like hours, pay/credit, supervisor, subject, etc...

## Setup

To clone the repository:
```bash
$ git clone https://github.com/LabConnect-RCOS/LabConnect-Frontend.git
```

To install dependencies:
```bash
npm install
```

## Developement
Running the application should be very simple. Use one of the commands below:
```bash
npm start
```
OR
```bash
npm run dev
```

You can also use the docker images in the packages that are created on all commits to the main branch or build with the commands below and serve the files through your own prefered methods:

```bash
npm run build
```

## Troubleshooting
If you encounter any bugs or issues in your experience, double check the spelling of your commands and consider force-quitting the application by entering `^C` in both the backend and frontend terminals. Then restart the application, and ensure that all connections and dependencies are installed and working, as decribed above.

Please don't hesitate to reach out with additional concerns or comments. We value your feedback in making LabConnect the best product it can be.

### Thank you so much for checking out LabConnect!
