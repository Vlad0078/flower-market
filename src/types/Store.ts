import type Flower from "./Flower";

export default interface Store {
	_id: string;
  name: string;
  address: string;
  photo: string;
  flowers: Flower[];
  createdAt: Date;
  updatedAt: Date;
}
