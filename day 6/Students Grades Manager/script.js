var students = [];

function addStudent() {
    var nameInput = document.getElementById('studentName');
    var gradeInput = document.getElementById('studentGrade');
    var name = nameInput.value.trim();
    var grade = gradeInput.value.trim();

    if (name === "") {
        alert("Please enter a student name.");
        return;
    }
    if (grade === "") {
        alert("Please enter a grade.");
        return;
    }
    if (isNaN(grade)) {
        alert("Grade must be a number.");
        return;
    }
    if (grade < 0 || grade > 100) {
        alert("Grade must be between 0 and 100.");
        return;
    }

    var student = {
        name: name,
        grade: Number(grade)
    };
    students.push(student);

    nameInput.value = "";
    gradeInput.value = "";
    document.getElementById('averageGrade').innerText = "";
    document.getElementById('gradesList').innerHTML = "";
    alert("Student added successfully!");
}

function displayGrades() {
    if (students.length === 0) {
        alert("No students to display.");
        return;
    }

    var gradesList = document.getElementById('gradesList');
    gradesList.innerHTML = "";

    for (var i = 0; i < students.length; i++) {
        var item = document.createElement('li');
        item.innerText = students[i].name + " - " + students[i].grade;
        gradesList.appendChild(item);
    }
}

function calculateAverage() {
    if (students.length === 0) {
        alert("No students to calculate average.");
        return;
    }

    var sum = 0;
    for (var i = 0; i < students.length; i++) {
        sum += students[i].grade;
    }

    var average = sum / students.length;
    document.getElementById('averageGrade').innerText = average.toFixed(2);
}
