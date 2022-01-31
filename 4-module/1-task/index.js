function makeFriendsList(friends) {
  const rootList = document.createElement('ul');

  friends.forEach((item) => {
    const newListItem = document.createElement('li');
    newListItem.innerText = `${item.firstName} ${item.lastName}`;
    rootList.append(newListItem);
  });

  return rootList;
}
