import type { Location } from 'react-router-dom';

export interface IRouteSiblings {
	label: string;
	path: string;
}

export interface IRouteHandle {
	label: string;
	siblings?: IRouteSiblings[];
}

export interface IGuardState {
	from?: Location;
	reason?: 'auth';
}
