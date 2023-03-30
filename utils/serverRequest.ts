import axios from "axios";
import { IPlants } from "../models/plant";

const URL = 'https://plant-lab-7cbda-default-rtdb.europe-west1.firebasedatabase.app/';

export async function plantStorage(data: IPlants) {
  const response =  await axios.post(URL + 'plants.json', data)
  const id = response.data.name;
  return id;
}

export async function fetchPlants() {
  const response = await axios.get(URL + 'plants.json')
  const plants = [];

  for (let key in response.data) {
    const plantItem = {
      id: key,
      name: response.data[key].name,
      water: response.data[key].water,
      sun: response.data[key].sun,
      imgUrl: response.data[key].imgUrl,
      price: response.data[key].price,
      date: response.data[key].date,
      freq: response.data[key].freq
    };
    plants.push(plantItem);
  }
  return plants;
}

export function modifyPlant(id: string, data: IPlants) {
  return axios.put(URL + `plants/${id}.json`, data);
}

export function removePlant(id: string) {
  return axios.delete(URL + `plants/${id}.json`);
}