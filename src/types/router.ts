export interface IRouteSiblings {
	label: string;
	path: string;
}

export interface IRouteHandle {
	label: string;
	siblings?: IRouteSiblings[];
}
