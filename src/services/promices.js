import students from "../data/studentsData.js";

import { showHeader } from "../views/display.js";

import { ask, pause } from "../utils/input.js";




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

export {
    searchStudent,
    demonstrateAsyncAwait
};