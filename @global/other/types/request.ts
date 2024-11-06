export interface Request {
	name: string;
	age: number;
	complication: string;
	city?: string;
	universities?: string[];
	abilities?: Ability[];
}

export interface Ability {
	name: string;
	checked: boolean;
}
