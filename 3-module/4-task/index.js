function showSalary(users, age) {
  let filteredUsers = users.filter((user) => user.age <= age);

  return filteredUsers.map((item) => item.name + ', ' + item.balance).join('\n');
}
