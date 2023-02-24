const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Creating empty array for team
let team = [];

startProgram()

// Function to start adding team members
async function startProgram(){
    const answers = await inquirer
    .prompt([
        {
            type: "list",
            name: "choiceInput",
            message: "Please select what you would like to do",
            choices: ["Add a Manager", "Add an Engineer", "Add an Intern", new inquirer.Separator(),"Finish building Team"]
        }
    ])
    .then((answers) => {
        if(answers.choiceInput === "Add a Manager"){
            managerQuestList();
        }
        else if(answers.choiceInput === "Add an Engineer"){
            engineerQuestList();
        }
        else if(answers.choiceInput === "Add an Intern"){
            internQuestList();
        }
        else if(answers.choiceInput === "Finish building Team"){
            console.log(`Thank you for the information, I will finish building the Team Profile Website`);
            return team;
        }
    })


    let htmlDoc = render(team);
    await fs.writeFile(outputPath, htmlDoc);
}


// Question sets for employee types
let managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "What is the Manager's Name?",
    },
    {
        type: "input",
        name: "managerID",
        message: "What is the Manager's ID?",
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the Manager's email?",
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the Manager's Office Number?",
    }
]

let engineerQuestions = [
    {
        type: "input",
        name: "engineerName",
        message: "What is the Engineer's Name?",
    },
    {
        type: "input",
        name: "engineerID",
        message: "What is the Engineer's ID?",
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is the Engineer's email?",
    },
    {
        type: "input",
        name: "engineerGitHub",
        message: "What is the Engineer's GitHub Username?",
    }
]

let internQuestions = [
    {
        type: "input",
        name: "internName",
        message: "What is the Intern's Name?",
    },
    {
        type: "input",
        name: "internID",
        message: "What is the Intern's ID?",
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is the Intern's email?",
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is the Intern's School?",
    }
]

// Functions to run employee type questions
async function managerQuestList(){
    const answers = await inquirer
    .prompt(managerQuestions)
    .then((answers) => {
        team.push(new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber));
        startProgram();
    })
}

async function engineerQuestList(){
    const answers = await inquirer
    .prompt(engineerQuestions)
    .then((answers) => {
        team.push(new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGitHub));
        startProgram();
    })
}

async function internQuestList(){
    const answers = await inquirer
    .prompt(internQuestions)
    .then((answers) => {
        team.push(new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool));
        startProgram();
    })
}