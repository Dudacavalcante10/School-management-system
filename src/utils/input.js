
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function pause() {
    await ask("\nPressione ENTER para continuar...");
};




export {
    rl,
    ask,
    pause,
   
};