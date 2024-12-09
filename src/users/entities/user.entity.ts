import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		unique: true,
		nullable: false,
		type: 'varchar',
		length: 255,
	})
	name: string;

	@Column({
		nullable: false,
		type: 'varchar',
		length: 255,
		default: 'people',
	})
	role: string;

	@Column({
		unique: true,
		nullable: false,
		type: 'varchar',
		length: 255,
	})
	email: string;

	@Column({
		nullable: false,
		type: 'varchar',
		length: 255,
	})
	password: string;

	@Column({ default: false })
	isDeleted: boolean;

	@Column({ default: false })
	token: string;

	@CreateDateColumn({
		nullable: false,
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		nullable: false,
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;
}
