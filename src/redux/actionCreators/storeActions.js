export const storeDeletedMails = (deletedMails) => ({
  type: "STORE_DELETED_MAILS",
  payload: deletedMails,
});

export const storeInboxMails = (inboxMails) => ({
  type: "STORE_INBOX_MAILS",
  payload: inboxMails,
});

export const storeSpamMails = (spamMails) => ({
  type: "STORE_SPAM_MAILS",
  payload: spamMails,
});

export const storeNonDeletedInboxMails = (inboxMails) => ({
  type: "DELETE_INBOX_MAILS",
  payload: inboxMails,
});

export const handleInputChangeInStore = (name, value) => ({
  type: 'HANDLE_INPUT_CHANGE',
  payload: {
    name,
    value
  }
});

// export const handleInputChangeInStore = (obj) => ({
//   type: 'HANDLE_INPUT_CHANGE',
//   payload: {
//     name: obj.name,
//     value: obj.value
//   }
// });
