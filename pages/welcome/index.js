import { Container, Button } from "../../components/ui"
import { useRouter } from "next/router"

function Welcome() {
  const router = useRouter()

  const handleSignUpClick = () => {
    console.log('hi')
    router.push("/register")
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <Container id="ft-welcome">
      <div className="flex flex-col h-full justify-between py-12">
        <h1 className="text-6xl font-semibold relative">Track your gym progress</h1>
        <div className="flex flex-col gap-3">
          <Button color="white" onClick={handleSignUpClick}>Sign up</Button>
          <Button color="red" onClick={handleLoginClick}>Login</Button>
        </div>
      </div>
    </Container>
  )
}

export default Welcome