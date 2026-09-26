function UserCard({ name, email, role }) {
  return (
    <div className="border rounded-xl p-5 shadow">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <span className="text-blue-500">{role}</span>
    </div>
  );
}

export default UserCard;