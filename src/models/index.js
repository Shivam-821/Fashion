import { creatingAccessoriesCollection } from "./accessories.model.js";
import { creatingDressCollection } from "./dresses.model.js";
import { creatingFestiveCollection } from "./festive.model.js";
import { creatingTopCollection } from "./uppers.model.js";
import { creatingLowerCollection } from "./lowers.model.js";
import { creatingSareeCollection } from "./saree.model.js";
import { creatingKurtiCollection } from "./kurtis.model.js";


export const runAllCollectionCreation = async () => {
  await creatingAccessoriesCollection();
  await creatingDressCollection();
  await creatingFestiveCollection();
  await creatingKurtiCollection();
  await creatingLowerCollection();
  await creatingSareeCollection();
  await creatingTopCollection();
};