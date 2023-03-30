import { useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IPlants } from "../../models/plant";
import { setPlants } from "../../store/plants";
import { RootState } from "../../store/store";
import { fetchPlants } from "../../utils/serverRequest";
import PlantGridTile from "./PlantGridTile";

function renderPlantItem(itemData: {item: IPlants}) {
  const plantItem = itemData.item;
  const plantItemProps = {
    id: plantItem.id,
    name: plantItem.name,
    water: plantItem.water,
    sun: plantItem.sun,
    imgUrl: plantItem.imgUrl,
    price: plantItem.price,
    date: plantItem.date,
    freq: plantItem.freq
  }

  return <PlantGridTile {...plantItemProps}/>
}

function PlantsOutput() {
  const dispatch = useDispatch();
  const plantsData = useSelector((state: RootState) => state.plants);

  useEffect(() => {
    async function getPlants() {
      try  {
        const plants = await fetchPlants();
        dispatch(setPlants(plants))
      } catch (error) {
        alert('something went wrong')
      }
    }
    getPlants();
  }, [])

  return (
    <FlatList 
      data={plantsData.plants} 
      keyExtractor={() => new Date().getMinutes().toString() + Math.random().toString()} 
      renderItem={renderPlantItem} 
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  )

}

export default PlantsOutput;