export function getEventToTrigger(element) {
  let event = false;

  if (element.payload.fields.hasOwnProperty("messageType")) {
    if (element.payload.fields.messageType.stringValue === "restaurant_list") {
      switch (element.payload.fields.categoryName.stringValue) {
        case "pizza": {
          event = "CHOOSE_PIZZA_RESTAURANT";
          break;
        }
        case "kebab": {
          event = "CHOOSE_KEBAB_RESTAURANT";
          break;
        }
        case "indian": {
          event = "CHOOSE_INDIAN_RESTAURANT";
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  return event;
}
