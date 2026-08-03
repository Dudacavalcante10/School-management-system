// src/index.js
import {
    showHeader,
    showMenu,
    finishSystem,
    showBootMessage
} from "./views/display.js";

import {
    ask,
    pause
} from "./utils/input.js";

import {
    loadDevelopmentData
} from "./data/seed.js";

import {
    registerStudent,
    listStudents
} from "./services/student-service.js";

import {
    registerTeacher,
    listTeachers
} from "./services/teacher-service.js";

import {
    registerAbsence,
    showAbsences
} from "./services/absence-service.js";

import {
    showStatistics
} from "./services/statistic-service.js";

import {
    searchStudent,
    demonstrateAsyncAwait
} from "./services/promices.js";

// APPLICATION

async function main() {
    let option;

    do {
        showHeader();
        showMenu();
        option = await ask("Escolha uma opção: ");

        switch (option) {
            case "1":
                await registerStudent();
                break;
            case "2":
                await listStudents();
                break;
            case "3":
                await registerTeacher();
                break;
            case "4":
                await listTeachers();
                break;
            case "5":
                await registerAbsence();
                break;
            case "6":
                await showAbsences();
                break;
            case "7":
                await searchStudentHandler();
                break;
            case "8":
                await showStatistics();
                break;
            case "9":
                await demonstrateAsyncAwait();
                break;
            case "0":
                console.log("\n👋 Saindo do sistema...");
                break;
            default:
                console.log("\n❌ Opção inválida!");
                await pause();
                break;
        }
    } while (option !== "0");

    finishSystem();
}

// Handler para a opção de buscar aluno
async function searchStudentHandler() {
    showHeader();
    console.log("=========== CONSULTAR ALUNO (PROMISE) ===========\n");

    const registrationNumber = await ask("Digite a matrícula: ");

    try {
        const student = await searchStudent(registrationNumber);
        console.log("\n✅ Aluno encontrado!\n");
        console.log(`Nome.............: ${student.name}`);
        console.log(`Matrícula........: ${student.registrationNumber}`);
        console.log(`Média............: ${student.average}`);
        console.log(`Situação.........: ${student.getStatus()}`);
        console.log(`Cadastro.........: ${student.registrationDate.toLocaleString()}`);
    } catch (error) {
        console.log(`\n❌ ${error.message || error}`);
    }

    await pause();
}

//============================================================
// START
//============================================================

// Carregar dados de desenvolvimento
loadDevelopmentData();

// Sobrescrever mensagem de início
showBootMessage();

// Iniciar aplicação
main().catch(error => {
    console.error("❌ Erro fatal na aplicação:", error);
    process.exit(1);
});