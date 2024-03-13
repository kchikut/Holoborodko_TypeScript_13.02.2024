type Lecturer = {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string;
};

enum Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

class School {
    private _areas: Area[] = [];
    private _lecturers: Lecturer[] = [];

    public addArea(area: Area): void {
        this._areas.push(area);
    }

    public removeArea(areaName: string): void {
        this._areas = this._areas.filter(area => area.name !== areaName);
    }

    public addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    public removeLecturer(lecturerSurname: string): void {
        this._lecturers = this._lecturers.filter(lecturer => lecturer.surname !== lecturerSurname);
    }

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }
}

class Area {
    private _levels: Level[] = [];
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public addLevel(level: Level): void {
        this._levels.push(level);
    }

    public removeLevel(levelName: string): void {
        this._levels = this._levels.filter(level => level.name !== levelName);
    }

    get levels(): Level[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }
}

class Level {
    private _groups: Group[] = [];
    private _name: string;
    private _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    public addGroup(group: Group): void {
        this._groups.push(group);
    }

    public removeGroup(groupName: string): void {
        this._groups = this._groups.filter(group => group.name !== groupName);
    }

    get groups(): Group[] {
        return this._groups;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }
}

class Group {
    private _area: string;
    private _name: string;
    private _status: Status;
    private _students: Student[] = [];

    constructor(directionName: string, levelName: string) {
        this._area = directionName;
        this._name = levelName;
        this._status = Status.Active;
    }

    public addStudent(student: Student): void {
        this._students.push(student);
    }

    public removeStudent(studentSurname: string): void {
        this._students = this._students.filter(student => student.lastName !== studentSurname);
    }

    public setStatus(newStatus: Status): void {
        this._status = newStatus;
    }

    get area(): string {
        return this._area;
    }

    get name(): string {
        return this._name;
    }

    get status(): Status {
        return this._status;
    }

    get students(): Student[] {
        return this._students;
    }

    showPerformance(): Student[] {
        return this._students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    }
}

class Student {
    private _firstName: string;
    private _lastName: string;
    private _birthYear: number;
    private _grades: { [workName: string]: number } = {};
    private _visits: { [lesson: string]: boolean } = {};

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    public setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }

    public setVisit(lesson: string, present: boolean): void {
        this._visits[lesson] = present;
    }

    get fullName(): string {
        return this._lastName, this._firstName;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get lastName(): string {
        return this._lastName;
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    getPerformanceRating(): number {
        const gradeValues = Object.values(this._grades);

        if (!gradeValues.length) return 0;
        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (Object.values(this._visits).filter(present => present).length / Object.keys(this._visits).length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}