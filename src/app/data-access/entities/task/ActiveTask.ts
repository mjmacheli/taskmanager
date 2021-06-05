import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: 'active_task' })
export class ActiveTask extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Description: string;

    @Column()
    Details: string;

    @Column()
    ReminderDate: Date;

    @Column()
    DueDate: Date;

    @Column()
    Status: boolean;

}