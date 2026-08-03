import Student from "../models/student.js";

import students from "../data/studentsData.js";

import { showHeader } from "../views/display.js";

import { ask, pause } from "../utils/input.js";



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

};
export {
    registerStudent,
    listStudents
};