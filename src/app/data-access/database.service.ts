import {Injectable} from '@angular/core';
import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {Settings} from './repositories/settings';
import {User} from './entities/user.entity';
import { ActiveTask } from './entities/task/ActiveTask';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        Settings.initialize();
        this.options = {
            type: 'sqlite',
            database: Settings.dbPath,
            entities: [User, ActiveTask],
            synchronize: true,
            logging: 'all',
        };
        this.connection = createConnection(this.options);
    }
    
    form: FormGroup = new FormGroup({
        id: new FormControl(''),
        description: new FormControl('', Validators.required),
        details: new FormControl(''),
        reminderDate: new FormControl(new Date(), Validators.required),
        dueDate: new FormControl('')
    });

    initFormGroup() {
        this.form.setValue({
            id: '',
            description: '',
            details: '',
            reminderDate: new Date(),
            dueDate: ''
        });
    }
}
