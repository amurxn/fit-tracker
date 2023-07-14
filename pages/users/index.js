function Users({ users }) {
  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username} ~ {user.password}</li>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/users');
  const data = await res.json();

  if (!res.ok) {
    console.error(`Error fetching users: ${res.status}`);
    return {
      props: {
        users: [],
      },
    };
  }

  return {
    props: {
      users: data.data,
    },
  };
}

export default Users;
