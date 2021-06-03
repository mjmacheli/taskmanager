import * as moment from 'moment';

export class SearchParameter {
    searchString: string;
    searchCurrentTasks: boolean;
    searchFutureTasks: boolean;
    searchCompletedTasks: boolean;
    checkNotes: boolean;
    checkTags: boolean;
    searchByReminderDateLimit: boolean = false;

    constructor(searchString: string, searchCurrentTasks: boolean, searchFutureTasks: boolean, searchCompletedTasks: boolean, 
        checkNotes: boolean, checkTags: boolean, searchByReminderDateLimit: boolean) {
        this.searchString = (searchByReminderDateLimit == true) ? moment(searchString).utc().format('YYYY-MM-DD') : this.searchString = searchString;
        this.searchCurrentTasks = searchCurrentTasks;
        this.searchFutureTasks = searchFutureTasks;
        this.searchCompletedTasks = searchCompletedTasks;
        this.checkNotes = checkNotes;
        this.checkTags = checkTags;
        this.searchByReminderDateLimit = searchByReminderDateLimit;
    }

    toString() {
        return "Search String: " + this.searchString + "\n" +
                "Search current tasks list: " + this.searchFutureTasks + "\n" +
                "Search future tasks list: " + this.searchFutureTasks + "\n" +
                "Search completed tasks list: " + this.searchCompletedTasks + "\n" +
                "Check notes: " + this.checkNotes + "\n" +
                "Search by tag: " + this.checkTags + "\n" +
                "Search for tasks before specified reminder date: " + this.searchByReminderDateLimit;
    }
}