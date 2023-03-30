export interface IPlants {
  id: string;
  name: string;
  water: number;
  sun: number;
  imgUrl: string;
  price: string;
  date: string;
  freq: number;
}

class Plant implements IPlants {
  id: string;
  name: string;
  water: number;
  sun: number;
  imgUrl: string;
  price: string;
  date: string;
  freq: number;

  constructor(id: string, name: string, water: number, sun: number, imgUrl: string, price: string, date: string, freq: number) {
    this.id = id;
    this.name = name;
    this.water = water;
    this.sun = sun;
    this.imgUrl = imgUrl;
    this.price = price;
    this.date = date;
    this.freq = freq;
  }
}

export default Plant;
