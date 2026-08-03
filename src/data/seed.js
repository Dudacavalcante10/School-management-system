import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

import students from "./studentsData.js";
import teachers from "./teacherData.js";

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

export {
    loadDevelopmentData
};