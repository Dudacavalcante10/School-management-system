import students from "../data/studentsData.js";

import { showHeader } from "../views/display.js";

import { ask, pause } from "../utils/input.js";  
   
   
   // CLOSURE

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

export {
    registerAbsence,
    showAbsences
};
