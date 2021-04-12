import initialStore from "./initialStore";

const functionalReducer = (prevStoreData = initialStore, action) => {
  switch (action.type) {
    case "STORE_DELETED_MAILS":
      return {
        ...prevStoreData,
        deletedMails: action.payload,
      };

    case "STORE_INBOX_MAILS":
      return {
        ...prevStoreData,
        storedInboxMails: action.payload,
      };

    case "DELETE_INBOX_MAILS":
      return {
        ...prevStoreData,
        storedInboxMails: action.payload,
      };

    case "STORE_SPAM_MAILS":
      return {
        ...prevStoreData,
        storedSpamMails: action.payload,
      };
    
    case "HANDLE_INPUT_CHANGE":
      return {
        ...prevStoreData,
        fieldData: {...prevStoreData.fieldData, [action.payload.name]: action.payload.value}
      }

    default:
      return prevStoreData;
  }
};

export default functionalReducer;
