import { rl } from "../utils/input.js";

//============================================================
// MENU
//============================================================

function showMenu() {

    console.log("1 - Cadastrar aluno");
    console.log("2 - Listar alunos");
    console.log("3 - Cadastrar professor");
    console.log("4 - Listar professores");
    console.log("5 - Registrar falta");
    console.log("6 - Consultar faltas");
    console.log("7 - Buscar aluno (Promise)");
    console.log("8 - Estatísticas");
    console.log("9 - Demonstrar Async/Await");
    console.log("0 - Sair");
    console.log();

}


//============================================================
// FINISH
//============================================================

function finishSystem() {

    showHeader();

    console.log("Obrigado por utilizar o Sistema Escolar.\n");

    console.log("==============================================");
    console.log("School Management System");
    console.log("Versão 1.0 Legacy");
    console.log("Kaizen Software Labs");
    console.log("==============================================\n");

    console.log("Primeiro Commit da aplicação.\n");

    console.log("Este software continuará evoluindo durante");
    console.log("todo o restante do curso.\n");

    console.log("Até a próxima Sprint!\n");

    rl.close();

}


//============================================================
// FINAL BOOTSTRAP MESSAGE
//============================================================

function showBootMessage() {

    console.log("\n========================================");
    console.log("  SCHOOL MANAGEMENT SYSTEM v1.0 LEGACY");
    console.log("========================================");
    console.log("Base de desenvolvimento carregada.");
    console.log("12 alunos ativos");
    console.log("2 professores ativos");
    console.log("\nSistema pronto para execução.\n");

}


 /**input(oq mostra na tela) */
 function clearScreen() {
    console.clear();
};

function showHeader() {

    clearScreen();

    console.log("====================================================");
    console.log("        SCHOOL MANAGEMENT SYSTEM");
    console.log("             Versão Legacy 1.0");
    console.log("         Kaizen Software Labs");
    console.log("====================================================");
    console.log();
};

export {
    clearScreen,
    showHeader,
    showMenu,
    showBootMessage,
    finishSystem
};