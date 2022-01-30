function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age);

  return filteredUsers.reduce((previousValue, item, index, array) => {
    previousValue += item.name + ', ' + item.balance;

    if (index < array.length - 1) {
      previousValue += '\n';
    }

    return previousValue;
  }, '');
}
