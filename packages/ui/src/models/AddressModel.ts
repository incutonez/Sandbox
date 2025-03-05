import { AddressEntity } from "@incutonez/spec/dist";
import { ViewModel } from "@/models/ViewModel";

export class AddressModel extends ViewModel implements AddressEntity {
	id = undefined;
	lineOne = "";
	lineTwo = "";
	city = "";
	state = "";
	zipCode = "";
}
