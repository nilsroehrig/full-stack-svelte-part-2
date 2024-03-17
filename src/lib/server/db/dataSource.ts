import { Event } from '$lib/server/entities/Event';
import { User } from '$lib/server/entities/User';
import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
	MAIN_USER_EMAIL,
	MAIN_USER_NAME,
	MAIN_USER_PASSWORD,
	SECONDARY_USER_EMAIL,
	SECONDARY_USER_NAME,
	SECONDARY_USER_PASSWORD
} from '$env/static/private';

const AppDataSource = new DataSource({
	type: 'sqlite',
	database: './db.sqlite3',
	entities: [User, Event],
	synchronize: true,
	logging: true
});

export const initialized = AppDataSource.initialize().then(async (dataSource) => {
	const userRepository = dataSource.getRepository(User);
	let mainUser = await userRepository.findOne({ where: { email: MAIN_USER_EMAIL } });

	if (!mainUser) {
		const newUser = new User();
		newUser.email = MAIN_USER_EMAIL;
		newUser.username = MAIN_USER_NAME;
		newUser.password = bcrypt.hashSync(MAIN_USER_PASSWORD, 10);
		mainUser = await userRepository.save(newUser);
	}

	let secondaryUser = await userRepository.findOne({ where: { email: SECONDARY_USER_EMAIL } });

	if (!secondaryUser) {
		const newUser = new User();
		newUser.email = SECONDARY_USER_EMAIL;
		newUser.username = SECONDARY_USER_NAME;
		newUser.password = bcrypt.hashSync(SECONDARY_USER_PASSWORD, 10);
		secondaryUser = await userRepository.save(newUser);
	}

	const eventRepository = dataSource.getRepository(Event);

	const mainUserEvents = [
		{
			name: 'Community BBQ',
			location: 'Central Square 1, Centrica, SW1E 6LB',
			date: DateTime.now().plus({ days: 1 }).toJSDate(),
			description: 'Come and meet your neighbours!'
		},
		{
			name: 'Hamlet',
			location: 'Central Street 2, Centrica, SW1E 6LB',
			date: DateTime.now().plus({ weeks: 1 }).toJSDate()
		},
		{
			name: 'Acting Club',
			location: 'Central Street 1, Centrica, SW1E 6LB',
			date: DateTime.now().plus({ months: 1 }).toJSDate()
		}
	];

	for (const event of mainUserEvents) {
		const eventInDb = await eventRepository.findOne({
			where: { name: event.name }
		});

		if (!eventInDb) {
			const newEvent = new Event();
			newEvent.name = event.name;
			newEvent.location = event.location;
			newEvent.date = event.date;
			newEvent.owner = mainUser;
			newEvent.participants = [secondaryUser];
			await eventRepository.save(newEvent);
		}
	}

	const secondaryUserEvents = [
		{
			name: 'Cycling Tour',
			location: 'The Foothills 10, Centrica, SW1E 6LB',
			date: DateTime.now().plus({ days: 1 }).toJSDate()
		},
		{
			name: 'Theatre Night',
			location: 'Grand Theatre, Central Square 10, Centrica, SW1E 6LB',
			date: DateTime.now().plus({ weeks: 1 }).toJSDate()
		}
	];

	for (const event of secondaryUserEvents) {
		const eventInDb = await eventRepository.findOne({
			where: { name: event.name }
		});

		if (!eventInDb) {
			const newEvent = new Event();
			newEvent.name = event.name;
			newEvent.location = event.location;
			newEvent.date = event.date;
			newEvent.owner = secondaryUser;
			newEvent.participants = [mainUser];
			await eventRepository.save(newEvent);
		}
	}

	return dataSource;
});
