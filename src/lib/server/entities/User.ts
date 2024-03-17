import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Event } from './Event';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 50,
		unique: true,
		nullable: false
	})
	username: string;

	@Column({
		type: 'varchar',
		length: 254,
		unique: true,
		nullable: false
	})
	email: string;

	@Column({
		type: 'varchar',
		length: 100,
		nullable: false
	})
	password: string;

	@OneToMany(() => Event, (event) => event.owner)
	owned_events: Event[];

	@ManyToMany(() => Event, (event) => event.participants)
	@JoinTable({
		name: 'event_participants'
	})
	participated_events: Event[];
}
