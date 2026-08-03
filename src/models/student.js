import Person from "./person.js";

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

export default Student;