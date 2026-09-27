function ConditionalRendering({ isLoggedIn }) {
  return (
    <div className="p-6">
      {isLoggedIn ? (
        <h2 className="text-green-600">
          Welcome back!
        </h2>
      ) : (
        <h2 className="text-red-500">
          Please login.
        </h2>
      )}
    </div>
  );
}

export default ConditionalRendering;




