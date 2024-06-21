#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import cfonts from "cfonts";
// Intro
cfonts.say("Welcome to|MARIYAM IQBAL|Adventure|game", {
    font: 'block',
    align: 'center',
    colors: ['red', "yellow"],
    background: 'blackbright',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: 'node'
});
// Setting up classes
class Player {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
class Enemy {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
// Main game logic
async function main() {
    const { playerName } = await inquirer.prompt([
        {
            type: "input",
            name: "playerName",
            message: "Enter your name?"
        }
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            message: "Choose your enemy",
            choices: ["Goblin", "Orc", "Dragon"]
        }
    ]);
    const player = new Player(playerName);
    const enemy = new Enemy(enemyType);
    console.log(`${enemy.name} V/S ${player.name}`);
    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What do you want to do?",
                choices: ["Attack", "Defend", "Run"]
            }
        ]);
        switch (action) {
            case "Attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    player.decreaseHealth();
                    console.log(`${player.name} health: ${player.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (player.health <= 0) {
                        console.log(chalk.redBright("You lose!! Try Again"));
                        return;
                    }
                }
                else {
                    enemy.decreaseHealth();
                    console.log(`${player.name} health: ${player.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log(chalk.greenBright("Congratulations!! ***You win*** "));
                        return;
                    }
                }
                break;
            case "Defend":
                const defendChance = Math.random();
                if (defendChance > 0.3) {
                    console.log(`${player.name} successfully defended.`);
                }
                else {
                    player.decreaseHealth();
                    console.log(`${player.name} failed to defend.`);
                    console.log(`${player.name} health: ${player.health}`);
                    if (player.health <= 0) {
                        console.log(chalk.redBright("You lose!! Try Again"));
                        return;
                    }
                }
                break;
            case "Run":
                const runChance = Math.random();
                if (runChance > 0.5) {
                    console.log(`${player.name} successfully escaped.`);
                    return;
                }
                else {
                    console.log(`${player.name} failed to escape.`);
                    enemy.decreaseHealth();
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log(chalk.greenBright("Congratulations!! ***You win*** "));
                        return;
                    }
                }
                break;
            default:
                console.log("Invalid action");
        }
    } while (true);
}
main();
