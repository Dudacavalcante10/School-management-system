/**
 * ============================================================
 * SCHOOL MANAGEMENT SYSTEM
 * Versão: 1.0 Legacy
 * Empresa: Kaizen Software Labs
 *
 * Data de criação: 30/06/2026
 *
 * Tech Lead:
 * Alexandre Magno
 *
 * Projeto desenvolvido durante a UC de JavaScript Essentials 2
 * como base para evolução nas próximas Unidades Curriculares.
 *
 * TODO Sprint 1 -> Modularização
 * TODO Sprint 2 -> DOM
 * TODO Sprint 3 -> SQLite
 * TODO Sprint 4 -> API Python
 * TODO Sprint 5 -> Testes
 * ============================================================
 */

"use strict";

//============================================================
// IMPORTS
//============================================================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//============================================================
// UTILS
//============================================================

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

async function pause() {
    await ask("\nPressione ENTER para continuar...");
}

function clearScreen() {
    console.clear();
}

function showHeader() {

    clearScreen();

    console.log("====================================================");
    console.log("        SCHOOL MANAGEMENT SYSTEM");
    console.log("             Versão Legacy 1.0");
    console.log("         Kaizen Software Labs");
    console.log("====================================================");
    console.log();
}

//============================================================
// MODELS
//============================================================

class Person {

    constructor(name) {

        this.name = name;
        this.registrationDate = new Date();

    }

}

class Student extends Person {

    #average;

    constructor(name, registrationNumber, average = 0) {

        super(name);

        this.registrationNumber = registrationNumber;
        this.#average = Number(average);

    }

    get average() {

        return this.#average;

    }

    set average(value) {

        const grade = Number(value);

        if (grade >= 0 && grade <= 10) {

            this.#average = grade;

        }

    }

    getStatus() {

        if (this.#average >= 7)
            return "APROVADO";

        if (this.#average >= 5)
            return "RECUPERAÇÃO";

        return "REPROVADO";

    }

}

class Teacher extends Person {

    constructor(name, subject) {

        super(name);

        this.subject = subject;

    }

}

//============================================================
// DATA
//============================================================

const students = [];
const teachers = [];

//============================================================
// CLOSURE
//============================================================

function createAbsenceController() {

    const absences = new Map();

    return {

        add(registrationNumber) {

            const current = absences.get(registrationNumber) || 0;

            absences.set(registrationNumber, current + 1);

        },

        get(registrationNumber) {

            return absences.get(registrationNumber) || 0;

        }

    };

}

const absenceController = createAbsenceController();

//============================================================
// STATISTICS
//============================================================

function getStatistics() {

    const totalStudents = students.length;
    const totalTeachers = teachers.length;

    let average = 0;

    if (totalStudents > 0) {

        average = students.reduce((sum, student) => {

            return sum + student.average;

        }, 0) / totalStudents;

    }

    let bestStudent = null;

    if (totalStudents > 0) {

        bestStudent = students.reduce((best, current) => {

            return current.average > best.average
                ? current
                : best;

        });

    }

    return {

        totalStudents,
        totalTeachers,
        average,
        bestStudent

    };

}

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
// SERVICES
//============================================================

//------------------------------------------------------------
// STUDENTS
//------------------------------------------------------------

async function registerStudent() {

    showHeader();

    console.log("=========== CADASTRO DE ALUNO ===========\n");

    const name = await ask("Nome: ");
    const registrationNumber = await ask("Matrícula: ");
    const average = await ask("Média: ");

    const student = new Student(
        name,
        registrationNumber,
        Number(average)
    );

    students.push(student);

    console.log("\n✅ Aluno cadastrado com sucesso!");

    await pause();

}

function listStudents() {

    showHeader();

    console.log("=========== LISTA DE ALUNOS ===========\n");

    if (students.length === 0) {

        console.log("Nenhum aluno cadastrado.");

        return pause();

    }

    students.forEach((student, index) => {

        console.log(`${index + 1}`);

        console.log(`Nome.............: ${student.name}`);
        console.log(`Matrícula........: ${student.registrationNumber}`);
        console.log(`Média............: ${student.average}`);
        console.log(`Situação.........: ${student.getStatus()}`);
        console.log(`Cadastro.........: ${student.registrationDate.toLocaleString()}`);
        console.log("-------------------------------------------");

    });

    return pause();

}

//------------------------------------------------------------
// TEACHERS
//------------------------------------------------------------

async function registerTeacher() {

    showHeader();

    console.log("========== CADASTRO DE PROFESSOR ==========\n");

    const name = await ask("Nome: ");
    const subject = await ask("Disciplina: ");

    const teacher = new Teacher(
        name,
        subject
    );

    teachers.push(teacher);

    console.log("\n✅ Professor cadastrado com sucesso!");

    await pause();

}

function listTeachers() {

    showHeader();

    console.log("========== LISTA DE PROFESSORES ==========\n");

    if (teachers.length === 0) {

        console.log("Nenhum professor cadastrado.");

        return pause();

    }

    teachers.forEach((teacher, index) => {

        console.log(`${index + 1}`);

        console.log(`Nome.............: ${teacher.name}`);
        console.log(`Disciplina.......: ${teacher.subject}`);
        console.log(`Cadastro.........: ${teacher.registrationDate.toLocaleString()}`);

        console.log("-------------------------------------------");

    });

    return pause();

}

//------------------------------------------------------------
// ABSENCES (Closure)
//------------------------------------------------------------

async function registerAbsence() {

    showHeader();

    console.log("=========== REGISTRAR FALTA ===========\n");

    const registrationNumber = await ask("Digite a matrícula do aluno: ");

    const student = students.find(student =>
        student.registrationNumber === registrationNumber
    );

    if (!student) {

        console.log("\n❌ Aluno não encontrado.");

        return pause();

    }

    absenceController.add(registrationNumber);

    console.log("\n✅ Falta registrada com sucesso!");

    await pause();

}

async function showAbsences() {

    showHeader();

    console.log("=========== CONSULTAR FALTAS ===========\n");

    const registrationNumber = await ask("Digite a matrícula: ");

    const student = students.find(student =>
        student.registrationNumber === registrationNumber
    );

    if (!student) {

        console.log("\n❌ Aluno não encontrado.");

        return pause();

    }

    console.log(`\nAluno: ${student.name}`);

    console.log(
        `Faltas registradas: ${absenceController.get(registrationNumber)}`
    );

    await pause();

}

//------------------------------------------------------------
// PROMISE
//------------------------------------------------------------

function searchStudent(registrationNumber) {

    return new Promise((resolve, reject) => {

        console.log("\nConsultando banco de dados...");

        setTimeout(() => {

            const student = students.find(student =>
                student.registrationNumber === registrationNumber
            );

            if (student) {

                resolve(student);

            } else {

                reject("Aluno não encontrado.");

            }

        }, 2000);

    });

}

//------------------------------------------------------------
// ASYNC / AWAIT
//------------------------------------------------------------

async function demonstrateAsyncAwait() {

    showHeader();

    console.log("=========== ASYNC / AWAIT ===========\n");

    const registrationNumber = await ask("Digite a matrícula: ");

    try {

        const student = await searchStudent(registrationNumber);

        console.log("\n✅ Aluno encontrado!\n");

        console.log(`Nome.............: ${student.name}`);
        console.log(`Matrícula........: ${student.registrationNumber}`);
        console.log(`Média............: ${student.average}`);
        console.log(`Situação.........: ${student.getStatus()}`);

    } catch (error) {

        console.log(`\n❌ ${error}`);

    }

    await pause();

}

//------------------------------------------------------------
// STATISTICS
//------------------------------------------------------------

async function showStatistics() {

    showHeader();

    console.log("=========== ESTATÍSTICAS ===========\n");

    const statistics = getStatistics();

    console.log(`Quantidade de alunos.......: ${statistics.totalStudents}`);

    console.log(`Quantidade de professores..: ${statistics.totalTeachers}`);

    console.log(
        `Média geral................: ${statistics.average.toFixed(2)}`
    );

    if (statistics.bestStudent) {

        console.log("\nMelhor aluno");

        console.log("----------------------------");

        console.log(`Nome.....: ${statistics.bestStudent.name}`);

        console.log(`Média....: ${statistics.bestStudent.average}`);

        console.log(`Situação.: ${statistics.bestStudent.getStatus()}`);

    }

    await pause();

}
//============================================================
// APPLICATION
//============================================================

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

                    console.log(`\n❌ ${error}`);

                }

                await pause();

                break;

            case "8":

                await showStatistics();

                break;

            case "9":

                await demonstrateAsyncAwait();

                break;

            case "0":

                break;

            default:

                console.log("\n❌ Opção inválida!");

                await pause();

        }

    } while (option !== "0");

    finishSystem();

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
// START
//============================================================

main();

//============================================================
// DEVELOPMENT DATA (SEED)
//============================================================

function loadDevelopmentData() {

    //========================
    // STUDENTS
    //========================

    students.push(
        new Student("Álvaro", "1001", 9.8),
        new Student("Arthur", "1002", 9.5),
        new Student("Victor", "1003", 9.1),
        new Student("Ryan", "1004", 9.4),
        new Student("Matheus", "1005", 9.3),
        new Student("Anny", "1006", 9.6),
        new Student("Ana", "1007", 9.0),
        new Student("Eduarda", "1008", 9.7),
        new Student("João Victor", "1009", 9.9),
        new Student("Wenso", "1010", 9.2),

        // Generic test cases
        new Student("Carlos", "2001", 4.5),
        new Student("Maria", "2002", 6.0)
    );

    //========================
    // TEACHERS
    //========================

    teachers.push(
        new Teacher("Alexandre", "Desenvolvimento Web"),
        new Teacher("Moisés", "Algoritmos")
    );

}

//============================================================
// CALL SEED AT START
//============================================================

loadDevelopmentData();

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

// Override main start flow message
showBootMessage();

//============================================================
// FINAL NOTES (ENGINEERING TODOs)
//============================================================

/*

============================================================
ROADMAP DE EVOLUÇÃO DO SISTEMA
============================================================

SPRINT 1 - MODULARIZAÇÃO
- Separar Models
- Separar Services
- Separar Utils
- Separar Data (seed)

SPRINT 2 - FRONTEND (DOM)
- Criar interface HTML
- Substituir console por dashboard
- Renderizar alunos e professores

SPRINT 3 - BANCO DE DADOS (SQLite / Python)
- Persistência de alunos
- Persistência de professores
- Persistência de faltas

SPRINT 4 - API (Python Backend)
- Endpoints REST
- Integração com frontend

SPRINT 5 - AUTENTICAÇÃO
- Login de professor
- Permissões

SPRINT 6 - TESTES
- Jest / PyTest
- Testes de serviços

SPRINT 7 - INGLÊS TÉCNICO
- Documentação
- README em inglês
- Tickets simulados

============================================================
KAIZEN ENGINEERING PRINCIPLE
============================================================

"O sistema nunca será reescrito.
Ele será evoluído."

============================================================

*/


