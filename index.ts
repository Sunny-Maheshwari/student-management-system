#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
console.log(randomNumber);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "please enter a non empty value";
    },
  },
  {
    name: "course",
    type: "list",
    message: "select the course to enrolled",
    choices: ["MS office", "html", "javascript", "typescript", "phython"],
  },
]);

const tutionFee: { [key: string]: number } = {
  "MS office": 2000,
  html: 2500,
  javascript: 5000,
  typescript: 6000,
  phython: 10000,
};
console.log(`\nTution Fees: ${tutionFee[answer.course]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "please select a payment method",
    choices: ["Bank transfer", "easypaisa", "jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: "transfer money",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "please enter a non empty value";
    },
  },
]);

console.log(`you select payment method ${paymentType.payment}`);

const tutionFees = tutionFee[answer.course];
const paymentAmount = parseFloat(paymentType.amount);

if (tutionFees === paymentAmount) {
  console.log(
    `congratulation you have successfully enrolled in ${answer.course}`
  );

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "what would you like to do next",
      choices: ["view status", "exit"],
    },
  ]);

  if (ans.select === "view status") {
    console.log(`\n********Status********\n`);
    console.log(`Student_Name: ${answer.student}`);
    console.log(`Student_id: ${randomNumber}`);
    console.log(`course: ${answer.course}`);
    console.log(`Tution_fee: ${paymentAmount}`);
    console.log(`Balance: ${(myBalance += paymentAmount)}`);
  } else {
    console.log(`Exiting student management system`);
  }
} else {
  console.log(`Invalid due to course`);
}

console.log(`the end`);
