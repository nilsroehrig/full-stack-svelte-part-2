import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Event {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		unique: true,
		nullable: false
	})
	name: string;

	@Column({
		type: 'varchar',
		nullable: false
	})
	location: string;

	@Column({
		type: 'datetime',
		nullable: false
	})
	date: Date;

	@Column({
		type: 'text',
		nullable: true
	})
	description: string | null;

	@ManyToOne(() => User, (user) => user.owned_events)
	owner: User;

	@ManyToMany(() => User, (user) => user.participated_events)
	@JoinTable({
		name: 'event_participants'
	})
	participants: User[];
}
