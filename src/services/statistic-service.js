import students from "../data/studentsData.js";
import teachers from "../data/teacherData.js";

import { showHeader } from "../views/display.js";
import { pause } from "../utils/input.js";

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


export {
    showStatistics,
    getStatistics
};