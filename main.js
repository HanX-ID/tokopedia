const readline = require("readline");
const { main } = require("./function");

const cyan = (text) => `\x1b[36m${text}\x1b[0m`;
const yellow = (text) => `\x1b[33m${text}\x1b[0m`;

console.log(cyan("┌────────────────────────────┐"));
console.log(cyan("│   Tokopedia OTP Sender 🚀  │"));
console.log(cyan("└────────────────────────────┘"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(yellow("Masukan Nomor [Example: 628XXX]\n>> "), (nomor) => {
  main(nomor.trim());
  rl.close();
});