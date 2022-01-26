function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age);

  return filteredUsers.reduce(function(previousValue, item, index) {
    previousValue += item.name + ', ' + item.balance;

    if (index < array.length - 1) {
      previousValue += '\n';
    }

    return previousValue;
  }, '');
}
