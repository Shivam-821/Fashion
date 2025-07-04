import {creatingAccessoriesCollection} from "./accessories.model.js";
import {creatingDressCollection} from "./dresses.model.js";
import {creatingFestiveCollection} from "./festive.model.js";
import {creatingTopCollection} from "./uppers.model.js";
import {creatingLowerCollection} from "./lowers.model.js";
import {creatingSareeCollection} from "./saree.model.js";
import {creatingKurtiCollection} from "./kurtis.model.js";

import {User} from "./user.model.js";
import {SareeSuggestion} from "./saree.model.js";
import {TopsSuggestion} from "./uppers.model.js";
import {DressSuggestion} from "./dresses.model.js";
import {KurtiSuggestion} from "./kurtis.model.js";
import {BottomsSuggestion} from "./lowers.model.js";
import {FestiveSuggestion} from "./festive.model.js";
import {OutfitSuggestion} from "./accessories.model.js";

export const runAllCollectionCreation = async () => {
  await creatingAccessoriesCollection();
  await creatingDressCollection();
  await creatingFestiveCollection();
  await creatingKurtiCollection();
  await creatingLowerCollection();
  await creatingSareeCollection();
  await creatingTopCollection();
};

export {
  User,
  SareeSuggestion,
  TopsSuggestion,
  DressSuggestion,
  KurtiSuggestion,
  BottomsSuggestion,
  FestiveSuggestion,
  OutfitSuggestion,
};
