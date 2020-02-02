const users = [];
const addUser = ({ id, name, room, joinTime }) => {
  name = name.replace(/\s+/g, '').toLowerCase();
  room = room.replace(/\s+/g, '').toLowerCase();

  const userInList = users.find(
    user => user.name === name && user.room === room
  );
  if (userInList) {
    return { error: 'The username has already been taken in the chat room!' };
  }

  const user = { id, name, room, joinTime };
  users.push(user);

  return { user };
};

const deleteUser = id => {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex) {
    return users.splice(userIndex, 1);
  }
};

const getUser = id => {
  return users.find(user => user.id === id);
};

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { users, addUser, deleteUser, getUser, getUsersInRoom };
