export class Script {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner;
        this.isPublic = false;
        this.assignedUsers = []
        this.requirements = []
    }
}
