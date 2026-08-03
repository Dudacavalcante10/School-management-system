import Teacher from "../models/teacher.js";

import teachers from "../data/teacherData.js";

import { showHeader } from "../views/display.js";

import { ask, pause } from "../utils/input.js";



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

};

export {
    registerTeacher,
    listTeachers
};