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
      return "Please enter a non-empty value";
    },
  },
  {
    name: "course",
    type: "list",
    message: "Select the course to enroll",
    choices: [
      "MS office",
      "html",
      "javascript",
      "typescript",
      "python",
      "View course details",
    ],
  },
]);

if (answer.course === "View course details") {
  console.log(`\n********Course Details********\n`);
  console.log(`MS office: $2000`);
  console.log(`html: $2500`);
  console.log(`javascript: $5000`);
  console.log(`typescript: $6000`);
  console.log(`python: $10000`);
  console.log(`\nPlease run the script again to enroll in a course.\n`);
  process.exit();
}

const tuitionFee: { [key: string]: number } = {
  "MS office": 2000,
  html: 2500,
  javascript: 5000,
  typescript: 6000,
  python: 10000,
};
console.log(`\nTuition Fee: ${tuitionFee[answer.course]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Please select a payment method",
    choices: ["Bank transfer", "easypaisa", "jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Enter the amount to transfer",
    validate: function (value) {
      if (!isNaN(value) && parseFloat(value) > 0) {
        return true;
      }
      return "Please enter a valid amount";
    },
  },
]);

console.log(`You selected payment method ${paymentType.payment}`);

const tuitionFees = tuitionFee[answer.course];
const paymentAmount = parseFloat(paymentType.amount);

if (paymentAmount >= tuitionFees) {
  console.log(
    `Congratulations! You have successfully enrolled in ${answer.course}`
  );
  myBalance += paymentAmount;

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View status","View Course Details",, "Exit"],
    },
  ]);

  if (ans.select === "View status") {
    console.log(`\n********Status********\n`);
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.course}`);
    console.log(`Tuition Fee: ${tuitionFees}`);
    console.log(`Paid Amount: ${paymentAmount}`);
    console.log(`Balance: ${myBalance - tuitionFees}`);
  } else {
    console.log(`Exiting student management system`);
  }
} else {
  console.log(`Insufficient amount paid. Please try again.`);
}
console.log(`The end`);
