import { withSessionSsr } from "../config/withSession"

export default function Home() {

  return (
    <main>
      Hello world
    </main>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});