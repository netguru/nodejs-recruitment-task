import chalk from "chalk";

let startup = new Date();
let last = new Date();

export const resetStartupTime = (): void => {
  startup = new Date();
};

const elapsedSecondsSinceStartup = (): number => (new Date().getTime() - startup.getTime()) / 1000.0;
const elapsedMillisecondsSinceLast = (): number => new Date().getTime() - last.getTime();

const getNowDateParts = (): { date: string; time: string } => {
  const split = new Date().toISOString().slice(0, -1).split("T");
  return { date: split[0], time: split[1] };
};

// eslint-disable-next-line
export const prettyPrint = (source: any, message: string): string => {
  const casted = source as {
    constructor?: { name?: string };
    name?: string;
    toString: () => string;
  };
  let src: string = source ? casted.toString() : "";
  if (typeof source !== "string") {
    let found = false;
    try {
      if (casted && casted["name"]) {
        src = casted["name"];
        found = true;
      }
    } catch (e) {
      //
    }
    try {
      if (!found && source && casted["constructor"]) {
        if (casted["constructor"]["name"]) {
          src = casted["constructor"]["name"];
        }
      }
    } catch (e) {
      //
    }
  }
  const date = getNowDateParts();
  const elapsedStartup = elapsedSecondsSinceStartup().toFixed(2);
  const elapsedLast = elapsedMillisecondsSinceLast().toFixed(0);
  last = new Date();
  return chalk.gray(
    `[${chalk.cyan(date.date)} ${chalk.blue(date.time)} ${chalk.green(elapsedStartup)}s ${chalk.magenta(
      elapsedLast
    )}ms][${chalk.yellow(src)}]:\n$ ${message}`
  );
};
