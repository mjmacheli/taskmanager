import { Tag } from './tag';
import { TaskNote } from './task-note';

export class Task {
    id: Number;
    description: String;
    details: String;
    reminderDate: Date;
    dueDate: Date;
    tags: Tag[] = new Array<Tag>();
    notes: TaskNote[] = new Array<TaskNote>();

    toString() {
        return "ID: " + this.id + "\n" +
            "Description: " + this.description + "\n" +
            "Details: " + this.details + "\n" +
            "Reminder Date: " + this.reminderDate + "\n" +
            "Due Date: " + this.dueDate;
    }
}