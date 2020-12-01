import { Category } from './category';
import { User } from './User';

const entities: (
	| typeof User
	| typeof Category
)[] = [User, Category];

export default entities;
