import { User } from '../entities/user.entity';

export const users: User[] = [
	{
		id: '1',
		name: 'John Doe',
		email: 'john.doe@example.com',
		password: '123456',
		token: '11111-11111-11111-11111',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'admin',
	},
	{
		id: '2',
		name: 'Jane Doe',
		email: 'jane.does@example.com',
		password: '123456',
		token: '22222-22222-22222-22222',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'films',
	},
	{
		id: '3',
		name: 'John Smith',
		email: 'john.smith@example.com',
		password: '123456',
		token: '33333-33333-33333-33333',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'people',
	},
	{
		id: '4',
		name: 'Jane Smith',
		email: 'jane.smiths@example.com',
		password: '123456',
		token: '44444-44444-44444-44444',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'locations',
	},
	{
		id: '5',
		name: 'John Doe',
		email: 'john.doees@example.com',
		password: '123456',
		token: '55555-55555-55555-55555',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'species',
	},
	{
		id: '6',
		name: 'Jane Doe',
		email: 'jane.doess@example.com',
		password: '123456',
		token: '66666-66666-66666-66666',
		isDeleted: false,
		createdAt: undefined,
		updatedAt: undefined,
		role: 'vehicles',
	},
];
