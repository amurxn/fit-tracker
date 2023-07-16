import { withSessionSsr } from "../config/withSession"
import { Container, Input } from "@/components/ui"
import Categories from "@/components/Categories"
import Exercises from "@/components/Exercises"
import Search from "@/components/Search"
import { AppProvider } from '../context/AppContext';

export default function Home() {
  return (
    <AppProvider>
      <Container id="main">
        <div id="top-wrap">
          <Search />
          <Categories />
        </div>
        <Exercises />
      </Container>
    </AppProvider>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user

  if (!user) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})
